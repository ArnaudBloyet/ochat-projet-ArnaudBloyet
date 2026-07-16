<script>
    import { Menu, EllipsisVertical, Table } from "lucide-svelte";
    import { onMount } from "svelte";
    import Markdown from "svelte-exmarkdown";

    let token = $state(localStorage.getItem("token"));
    let tokenInput = $state("");
    let messages = $state([]);
    let newMessage = $state("");

    function saveToken() {
        if (!tokenInput.trim()) return;
        localStorage.setItem("token", tokenInput);
        token = tokenInput;
    }

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

    async function saveMessage(content, role) {
        await fetch("http://127.0.0.1:8090/api/collections/messages/records", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                content,
                role,
            }),
        });
    }

    async function getMessages() {
        const response = await fetch(
            "http://127.0.0.1:8090/api/collections/messages/records?sort=%2Bcreated",
        );
        const data = await response.json();
        console.log(data);
        messages = data.items;
    }
    onMount(async () => {
        await getMessages();
    });

    async function sendMessage(event) {
        event.preventDefault();
        if (!newMessage.trim()) return;
        // messages.push({
        //     role: "user",
        //     content: newMessage,
        // });

        const message = newMessage;
        newMessage = "";

        await saveMessage(message, "user");
        await getMessages();
        await askMistral();
        await getMessages();
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
    <aside></aside>
    <main class="chat">
        <header class="chat__header">
            <button class="chat__header__button">
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
        height: 100vh;
        background: #2a2b36;
    }

    main {
        height: 100%;
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
        color: white;
        font-weight: bold;
    }
</style>
