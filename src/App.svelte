<script>
    import { onMount } from "svelte";

    import Header from "./components/Header.svelte";
    import ChatForm from "./components/ChatForm.svelte";
    import Message from "./components/Message.svelte";
    import Sidebar from "./components/Sidebar.svelte";

    import { askMistral } from "./services/mistral.js";
    import {
        saveConversation,
        getConversations,
        saveMessage,
        getMessages,
        deleteConversation,
    } from "./services/pocketbase.js";
    import { formatDate } from "./utils/formatDate.js";

    let token = $state(localStorage.getItem("token"));
    let tokenInput = $state("");
    let conversations = $state([]);
    let newConversation = $state("");
    let currentConversation = $state(null);
    let messages = $state([]);
    let newMessage = $state("");
    let sidebarOpen = $state(true);

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }

    function saveToken() {
        if (!tokenInput.trim()) return;
        localStorage.setItem("token", tokenInput);
        token = tokenInput;
    }

    onMount(async () => {
        conversations = await getConversations();
    });

    async function sendMessage(event) {
        event.preventDefault();

        if (!currentConversation) {
            alert("Sélectionnez une conversation.");
            return;
        }
        if (!newMessage.trim()) return;

        const message = newMessage;
        newMessage = "";

        await saveMessage(message, "user", currentConversation.id);

        messages = await getMessages(currentConversation.id);

        const response = await askMistral(messages, token);

        await saveMessage(
            response.content,
            response.role,
            currentConversation.id,
        );

        messages = await getMessages(currentConversation.id);
    }

    async function createConversation(event) {
        event.preventDefault();
        if (!newConversation.trim()) return;
        const conversation = await saveConversation(newConversation);
        conversations = await getConversations();
        currentConversation = conversation;
        messages = [];
        newConversation = "";
    }

    async function selectConversation(conversation) {
        currentConversation = conversation;
        messages = await getMessages(conversation.id);
    }

    async function handleDeleteConversation(id) {
        await deleteConversation(id);

        conversations = await getConversations();

        messages = [];
        currentConversation = null;
    }
</script>

<div class="container">
    {#if sidebarOpen}
        <Sidebar
            {conversations}
            {currentConversation}
            bind:newConversation
            {createConversation}
            {selectConversation}
            deleteConversation = {handleDeleteConversation}
            {sidebarOpen}
        />
    {/if}

    <main class="chat">
        <Header {toggleSidebar} />

        {#if token}
            <section class="chat__messages">
                {#each messages as message}
                    <Message {message} {formatDate} />
                {/each}
            </section>

            <ChatForm bind:newMessage {sendMessage} />
        {:else}
            <input bind:value={tokenInput} placeholder="Votre token Mistral" />

            <button type="button" onclick={saveToken}> Enregistrer </button>
        {/if}
    </main>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container {
        display: flex;
        height: 100vh;
        background: #2a2b36;
    }

    main {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .chat {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .chat__messages {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        overflow-y: auto;
    }
</style>
