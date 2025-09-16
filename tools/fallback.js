import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.3';
// 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.min.js';
import { globalVars } from "./globals.js";

export async function fallback(message,generator) {
let input = `${globalVars.christianGuardrail}
User: ${message}
Assistant:
`;
const output = await generator(input, { max_new_tokens: 512 });
return output;
}

//load model pipeline to be added above as a generator
export async function loadFallbackModel(){
    return await pipeline('text-generation', 'Xenova/gpt2');
}