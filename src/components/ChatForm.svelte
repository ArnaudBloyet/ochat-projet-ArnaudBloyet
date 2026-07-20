<script>
    let { newMessage = $bindable(), sendMessage } = $props();
</script>

<form class="chat__form" onsubmit={sendMessage}>
    <textarea
        class="chat__form__input"
        placeholder="Envoyer un message"
        rows="1"
        bind:value={newMessage}
    ></textarea>
    <button class="chat__form__button" type="submit">envoyer</button>
</form>

<style>
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
</style>
