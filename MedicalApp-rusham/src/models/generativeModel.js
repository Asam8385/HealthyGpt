const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

// Replace with your actual API key (or set via environment variable)
const API_KEY = 'AIzaSyBmLKC8JAsN2WMM-5tKNcMkOMgDEv7FAc4';

// Initialize the GenAI client
const genAI = new GoogleGenerativeAI(API_KEY);

// Use the “gemma-3n-e4b-it” model for streaming text generation
const model = genAI.getGenerativeModel({ model: 'gemma-3n-e4b-it' });

/**
 * Returns a Promise that resolves to the generated text response
 * from gemma-3n-e4b-it, given a new user message. We mirror the 
 * same conversation history from your original example.
 *
 * @param {string} userInput
 * @returns {Promise<string>}
 */
async function getChatResponse (userInput) {
  // Build the conversation history as an array of Content objects
  const contents = [

    {
      role: 'user',
      parts: [{ text: userInput }],
    },
  ];

  // Generation configuration (you can tune these as needed)
  const generationConfig = {
    temperature: 1.0,
    topK: 64,
    topP: 0.95,
    // Note: maxOutputTokens 8192 may be too high for streaming in Node.
    // You can adjust down if you run into memory/time constraints.
    maxOutputTokens: 4096,
  };

  // Safety settings (same categories and thresholds as before)
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Stream the response from gemma-3n-e4b-it
  const stream = model.generateTextStream({
    contents,
    generationConfig,
    safetySettings,
  });

  let fullResponse = '';
  for await (const chunk of stream) {
    // Each chunk has a `generatedText` field containing the latest portion
    fullResponse += chunk.generatedText;
  }

  return fullResponse;
}

  
  module.exports = { getChatResponse };
  
