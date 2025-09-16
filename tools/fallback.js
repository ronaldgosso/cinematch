import { globalVars } from "./globals.js";

export async function fallback(message,generator) {
let input = `${globalVars.christianGuardrail}
User: ${message}
Assistant:
`;
const output = await generator(input, { max_new_tokens: 512 });
return output;
}
