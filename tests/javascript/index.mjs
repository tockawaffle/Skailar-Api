import SkailarChat from "../../dist/src/index.js";
import { performance } from "perf_hooks";

(async () => {
    const apiKey = "YOUR_API_KEY";

    async function OpenAi() {
        const start = performance.now();
        const skailarChat = new SkailarChat(apiKey);

        const chatCompletion = await skailarChat.CreateChatCompletion({
            model: "gpt-4-32k",
            messages: [
                {
                    role: "user",
                    content: "Hello, how are you?",
                },
            ],
        });
        console.log(chatCompletion);
        const end = performance.now();

        const executionTime = ((end - start) / 1000).toFixed(2); // Convert to seconds and round to two decimal places

        if (chatCompletion.id) {
            console.log(`Chat Completion ID: ${chatCompletion.id}`);
            console.log(`Chat Completion Response: ${chatCompletion.choices}`);
            console.log(`Chat Completion Time: ${executionTime}s`);
        } else {
            console.log(`Chat Completion Error: ${chatCompletion}`);
        }
    }

    async function Claude() {
        const start = performance.now();
        const skailarChat = new SkailarChat(apiKey);

        const chatCompletion = await skailarChat.CreateClaudeChatCompletion({
            messages: ["Human: who are you?", "Assistant:"],
            model: "claude-2",
            max_tokens_to_sample: 100,
            stream: false,
            temperature: 0.7,
            top_p: 0.7,
            top_k: 0.7,
        });

        const end = performance.now();

        const executionTime = ((end - start) / 1000).toFixed(2); // Convert to seconds and round to two decimal places

        if (chatCompletion.completion) {
            console.log(`Chat Completion ID: ${chatCompletion.log_id}`);
            console.log(
                `Chat Completion Response: ${chatCompletion.completion}`
            );
            console.log(`Chat Completion Time: ${executionTime}s`);
        } else {
            console.log(`Chat Completion Error: ${chatCompletion}`);
        }
    }

    await Claude();
})();
