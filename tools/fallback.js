import { pipeline } from '@huggingface/transformers';

export async function fallback(message,generator) {
const output = await generator(message, { max_new_tokens: 250 });
return output;
}

export async function loadFallbackModel(){
    return await pipeline('text-generation', 'Xenova/opt-125m');
}