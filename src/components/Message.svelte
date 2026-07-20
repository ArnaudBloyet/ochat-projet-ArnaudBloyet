<script>
    import Markdown from "svelte-exmarkdown";
    let { message, formatDate } = $props();
</script>

<article class="chat__message chat__message--{message.role}">
    <Markdown md={message.content} />

    <span class="chat__message__date">
        {formatDate(message.created)}
    </span>
</article>

<style>
    .chat__message {
        width: fit-content;
        max-width: 70%;
        padding: 1rem;
        border-radius: 12px;
        word-break: break-word;
    }

    .chat__message--user {
        align-self: flex-end;
        background-color: #dbeafe;
    }

    .chat__message--assistant {
        align-self: flex-start;
        background-color: #f3f4f6;
    }

    .chat__message__date {
        display: block;
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: #777;
        opacity: 0.7;
        /* text-align: right; */
    }

    .chat__message--user .chat__message__date {
        text-align: right;
    }

    .chat__message--assistant .chat__message__date {
        text-align: left;
    }
</style>
