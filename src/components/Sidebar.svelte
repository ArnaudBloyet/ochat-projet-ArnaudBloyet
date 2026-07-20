<script>
    import { Trash2 } from "lucide-svelte";

    let {
        conversations,
        currentConversation,
        newConversation = $bindable(),
        createConversation,
        selectConversation,
        deleteConversation,
        sidebarOpen,
    } = $props();
</script>

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

<style>
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
