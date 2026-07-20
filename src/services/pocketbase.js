export async function saveConversation(title) {
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

export async function getConversations() {
    const response = await fetch(
        "http://127.0.0.1:8090/api/collections/conversations/records?sort=created",
    );
    const data = await response.json();
    console.log(data);
    return data.items;
}

export async function saveMessage(content, role, conversationId) {
    await fetch("http://127.0.0.1:8090/api/collections/messages/records", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            content,
            role,
            conversation: conversationId,
        }),
    });
}

export async function getMessages(conversationId) {
    const response = await fetch(
        `http://127.0.0.1:8090/api/collections/messages/records?filter=(conversation="${conversationId}")&sort=created`,
    );

    const data = await response.json();

    return data.items;
}

export async function deleteConversation(id) {
    await fetch(
        `http://127.0.0.1:8090/api/collections/conversations/records/${id}`,
        {
            method: "DELETE",
        },
    );

    // conversations = await getConversations();

    // messages = [];
    // currentConversation = null;
}