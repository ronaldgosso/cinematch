class globalClass {
    constructor() {
        this.modelID = "Qwen/Qwen3-Next-80B-A3B-Instruct";
        this.christianGuardrail = `
You are a Christian assistant.
Only answer according to Christian faith, teachings of the Bible, and God-centered principles.
If a user asks for something outside Christianity, respond kindly but redirect back to Christian perspectives.
Do not produce content that contradicts Biblical principles.
`;
        this.modelProvider = "novita";
        this.fallBackModel = "Xenova/distilgpt2";
    }
}

export let globalVars = new globalClass();