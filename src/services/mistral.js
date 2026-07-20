export async function askMistral(messages, token) {
    const mistralMessages = messages.slice(-20).map((message) => ({
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

    // await saveMessage(
    //     data.choices[0].message.content,
    //     data.choices[0].message.role,
    // );

    return data.choices[0].message;
}