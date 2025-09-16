import { pipeline } from '@huggingface/transformers';
import { globalVars } from "./globals";

export async function fallback(message,generator) {
let input = `${globalVars.christianGuardrail}
User: ${message}
Assistant:
`;
const output = await generator(input, { max_new_tokens: 250 });
return output;
}

//load model pipeline to be added above as a generator
export async function loadFallbackModel(){
    return await pipeline('text-generation', 'Xenova/opt-125m');
}