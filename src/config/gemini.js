import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = "AIzaSyCokypk-zgcnOVUfo0GfGrELqqhA7dc93s"; // Make sure to keep this secure!
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text();

    console.log(response); // logs output text
    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Something went wrong!";
  }
}

export default run;
