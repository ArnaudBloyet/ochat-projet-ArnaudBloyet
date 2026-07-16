<script>
    import { Menu, EllipsisVertical, Trash2 } from "lucide-svelte";
    import { onMount } from "svelte";
    import Markdown from "svelte-exmarkdown";

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

    async function saveConversation(title) {
        const response = await fetch(
            "http://127.0.0.1:8090/api/collections/conversations/records",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
                }),
            },
        );
        return await response.json();
    }

    async function getConversations() {
        const response = await fetch(
            "http://127.0.0.1:8090/api/collections/conversations/records?sort=created",
        );
        const data = await response.json();
        console.log(data);
        conversations = data.items;
    }
    onMount(async () => {
        await getConversations();
    });

    async function saveMessage(content, role) {
        await fetch("http://127.0.0.1:8090/api/collections/messages/records", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                content,
                role,
                conversation: currentConversation.id,
            }),
        });
    }

    async function getMessages(conversationId) {
        const response = await fetch(
            `http://127.0.0.1:8090/api/collections/messages/records?filter=(conversation="${conversationId}")&sort=created`,
        );

        const data = await response.json();

        messages = data.items;
    }
    // onMount(async () => {
    //     await getMessages();
    // });

    async function askMistral() {
        const mistralMessages = messages.map((message) => ({
            role: message.role,
            content: message.content,
        }));
        const response = await fetch(
            "https://api.mistral.ai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    model: "mistral-small-latest",
                    messages: mistralMessages,
                }),
            },
        );
        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return;
        }

        // messages.push({
        //     role: data.choices[0].message.role,
        //     content: data.choices[0].message.content,
        // });

        await saveMessage(
            data.choices[0].message.content,
            data.choices[0].message.role,
        );
    }

    async function sendMessage(event) {
        event.preventDefault();
        if (!currentConversation) {
            alert("Sélectionnez une conversation.");
            return;
        }
        if (!newMessage.trim()) return;
        // messages.push({
        //     role: "user",
        //     content: newMessage,
        // });

        const message = newMessage;
        newMessage = "";

        await saveMessage(message, "user");
        await getMessages(currentConversation.id);
        await askMistral();
        await getMessages(currentConversation.id);
    }

    async function createConversation(event) {
        event.preventDefault();
        if (!newConversation.trim()) return;
        const conversation = await saveConversation(newConversation);
        await getConversations();
        currentConversation = conversation;
        messages = [];
        newConversation = "";
    }

    async function selectConversation(conversation) {
        currentConversation = conversation;
        await getMessages(conversation.id);
    }

    async function deleteConversation(id) {
        await fetch(
            `http://127.0.0.1:8090/api/collections/conversations/records/${id}`,
            {
                method: "DELETE",
            },
        );

        await getConversations();

        messages = [];
        currentConversation = null;
    }

    function formatDate(date) {
        const messageDate = new Date(date);
        const today = new Date();

        const isToday = messageDate.toDateString() === today.toDateString();

        if (isToday) {
            return messageDate.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
            });
        }

        return messageDate.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
</script>

<div class="container">
    {#if sidebarOpen}
        <aside class="sidebar">
            <h1>Conversations</h1>
            <section class="sidebar__conversations">
                {#each conversations as conversation}
                    <div
                        class="sidebar__conversation"
                        class:sidebar__conversation--active={currentConversation?.id ===
                            conversation.id}
                    >
                        <button
                            class="sidebar__conversation__title"
                            onclick={() => selectConversation(conversation)}
                        >
                            {conversation.title}
                        </button>

                        <button
                            class="sidebar__delete"
                            onclick={() => deleteConversation(conversation.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                {/each}
            </section>

            <form class="sidebar__form" onsubmit={createConversation}>
                <input
                    class="sidebar__input"
                    bind:value={newConversation}
                    type="text"
                    placeholder="Nouvelle conversation"
                />

                <button class="sidebar__button" type="submit">Créer</button>
            </form>
        </aside>
    {/if}

    <main class="chat">
        <header class="chat__header">
            <button class="chat__header__button" onclick={toggleSidebar}>
                <Menu size={24} />
            </button>

            <h1 class="chat__header__title">O'Chat</h1>

            <button class="chat__header__button">
                <EllipsisVertical size={24} />
            </button>
        </header>

        {#if token}
            <section class="chat__messages">
                {#each messages as message}
                    <article
                        class="chat__message chat__message--{message.role}"
                    >
                        <Markdown md={message.content} />

                        <span class="chat__message__date">
                            {formatDate(message.created)}
                        </span>
                    </article>
                {/each}
            </section>

            <form class="chat__form" onsubmit={sendMessage}>
                <textarea
                    class="chat__form__input"
                    placeholder="Envoyer un message"
                    rows="1"
                    bind:value={newMessage}
                ></textarea>
                <button class="chat__form__button" type="submit">envoyer</button
                >
            </form>
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

    .chat__header {
        display: none;
    }

    @media (max-width: 768px) {
        .chat__header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 1rem;

            border-bottom: 2px solid #ddd;
        }
        .chat__header button {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            border-radius: 8px;
            background: transparent;
            color: white;
            font-size: 1.4rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .chat__header button:hover {
            background: #50ebeb;
        }
        .chat__header__title {
            font-size: 1.8rem;
            color: white;
        }
    }

    .chat__messages {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        overflow-y: auto;
    }

    .chat__message {
        width: fit-content;
        max-width: 70%;
        padding: 1rem;
        border-radius: 12px;
    }

    .chat__message--user {
        align-self: flex-end;
        background-color: #dbeafe;
    }
    .chat__message--user .chat__message__date {
        text-align: right;
    }

    .chat__message--assistant {
        align-self: flex-start;
        background-color: #f3f4f6;
    }
    .chat__message--assistant .chat__message__date {
        text-align: left;
    }

    .chat__message__date {
        display: block;
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: #777;
    }

    .chat__form {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-top: 2px solid #ddd;
    }

    .chat__form__input {
        flex: 1;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    .chat__form__button {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        background: #50ebeb;
        color: black;
        font-weight: bold;
    }

    .sidebar {
        width: 280px;
        background: #202123;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #50ebeb;
        & h1 {
            color: white;
            margin: 0.8rem;
        }
    }

    .sidebar__form {
        padding: 1rem;
        border-top: 1px solid #50ebeb;

        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .sidebar__input {
        flex: 1;
        padding: 0.7rem;
        border: none;
        border-radius: 8px;
    }

    .sidebar__button {
        width: 100%;
        padding: 0.8rem;

        border: none;
        border-radius: 8px;

        background: #50ebeb;
        color: #202123;
        font-weight: bold;

        cursor: pointer;
    }

    .sidebar__conversations {
        flex: 1;
        overflow-y: auto;

        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }

    .sidebar__conversation {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 1rem;

        background: #2d2f3a;
        border-radius: 10px;

        transition: 0.2s;
    }

    .sidebar__conversation__title {
        flex: 1;
        width: 100%;
        height: 100%;
        padding: 0;
        text-align: left;

        background: transparent;
        border: none;

        color: white;
        font-size: 1rem;

        cursor: pointer;
    }

    .sidebar__delete {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 36px;
        height: 36px;

        margin-left: 1rem;

        border: none;
        border-radius: 6px;

        background: transparent;

        cursor: pointer;
    }

    .sidebar__delete:hover {
        background: #444654;
        color: #ff6b6b;
    }

    .sidebar__conversation:hover {
        background: #383b49;
    }

    .sidebar__conversation--active {
        background: #2d2f3a;
        border: 2px solid #50ebeb;
    }
</style>
