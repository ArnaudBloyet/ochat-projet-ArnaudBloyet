<script>
    import { Menu, EllipsisVertical, Trash2 } from "lucide-svelte";
    let { toggleSidebar } = $props();
</script>

<header class="chat__header">
    <button class="chat__header__button" onclick={toggleSidebar}>
        <Menu size={24} />
    </button>

    <h1 class="chat__header__title">O'Chat</h1>

    <button class="chat__header__button">
        <EllipsisVertical size={24} />
    </button>
</header>

<style>
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
</style>
