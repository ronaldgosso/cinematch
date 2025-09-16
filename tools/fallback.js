import { globalVars } from "./globals.js";
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.min.js'

export async function fallback(message, generator) {
    const output = await generator(message, { temperature: 0.7, max_new_tokens: 100, do_sample: false });
    // console.log(`output from fallback model: ${output[0].generated_text}`);
    return output[0].generated_text;
}

//load model pipeline to be added above as a generator
export async function loadFallbackModel() {
    return await pipeline('text-generation', globalVars.fallBackModel);
}

