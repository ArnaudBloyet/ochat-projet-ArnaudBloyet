<script>
    import { Menu, EllipsisVertical } from "lucide-svelte";
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

        <section class="chat__messages">
            <article class="chat__message chat__message--user"></article>

            <article class="chat__message chat__message--ai"></article>
        </section>

        <form class="chat__form">
            <input
                class="chat__form__input"
                type="text"
                placeholder="Envoyer un message"
            />
            <button class="chat__form__button" type="submit">envoyer</button>
        </form>
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
        max-width: 70%;
        padding: 1rem;
        border-radius: 12px;
    }

    .chat__message--user {
        align-self: flex-end;
        background-color: #dbeafe;
    }

    .chat__message--ai {
        align-self: flex-start;
        background-color: #f3f4f6;
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
