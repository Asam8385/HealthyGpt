// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

const MODEL_NAME = 'gemma-3n-e4b-it';

async function getChatResponse(userInput) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Please set the GEMINI_API_KEY environment variable.');
  }

  // 1. Initialize the GenAI client
  const ai = new GoogleGenAI({
    apiKey: 'AIzaSyBmLKC8JAsN2WMM-5tKNcMkOMgDEv7FAc4',
  });

  // 2. Build the conversation history, appending the new user input
  const contents = [
  ];

  // 3. Configure generation settings
  const config = {
    responseMimeType: 'text/plain',
    temperature: 1.0,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 4096,
  };

  // 4. Call generateContentStream and accumulate the response
  const responseStream = await ai.models.generateContentStream({
    model: MODEL_NAME,
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of responseStream) {
    fullText += chunk.text; // Accumulate each chunk’s text
  }

  // 5. Return the concatenated response text
  return fullText;
}
  
module.exports = { getChatResponse };
  
