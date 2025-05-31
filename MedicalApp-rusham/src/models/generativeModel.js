const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

// Ensure your API key is set in the environment:
//    export GEMINI_API_KEY="AIzaSyCUGnlIXYN1Ui-kZzXPS7S3ti4XKg7pJ_s"
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('Please set the GEMINI_API_KEY environment variable.');
}

// Initialize the GenAI client
const genAI = new GoogleGenerativeAI(API_KEY);

// Use the “gemma-3n-e4b-it” model
const model = genAI.getGenerativeModel({ model: 'gemma-3n-e4b-it' });

/**
 * Sends a conversational prompt (including history) to gemma-3n-e4b-it
 * using generateText, and returns the generated text.
 *
 * @param {string} userInput
 * @returns {Promise<string>}
 */
async function getChatResponse(userInput) {
  // 1. Build the conversation history as an array of Content objects:
  const contents = [
    {
      role: 'user',
      parts: [{ text: 'hel' }],
    },
    {
      role: 'assistant',
      parts: [
        {
          text:
            "It seems like you might need a bit more help. 😊 \n\n" +
            "Could you try finishing that word or telling me a bit more about what you need? \n\n" +
            "I'm ready to listen!",
        },
      ],
    },
    // Finally, append the new user-provided message
    {
      role: 'user',
      parts: [{ text: userInput }],
    },
  ];

  // 2. Generation configuration
  const generationConfig = {
    temperature: 1.0,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 4096,
  };

  // 3. Safety settings
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

  // 4. Make the generateText call (non‐streaming)
  const response = await model.generateText({
    contents,
    generationConfig,
    safetySettings,
  });

  // `response.generatedText` holds the model’s reply
  return response.generatedText;
}

// Example usage
(async () => {
  try {
    const reply = await getGemmaResponse("tell me a joke about computers");
    console.log("MODEL REPLY:\n", reply);
  } catch (err) {
    console.error("Error during generation:", err);
  }
})();


  
  module.exports = { getChatResponse };
  
