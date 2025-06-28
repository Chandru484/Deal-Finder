import { GoogleGenAI } from "@google/genai";
import { ProductDeal } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function isValidProductDeal(obj: any): obj is ProductDeal {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.productName === 'string' &&
    typeof obj.platform === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.rating === 'number' && obj.rating >= 0 && obj.rating <= 5 &&
    typeof obj.imageUrl === 'string' &&
    typeof obj.productUrl === 'string'
  );
}

function createPrompt(productName: string): string {
    return `
      You are a JSON generation API. Your single task is to find simulated e-commerce deals for a product and return them as a valid JSON array.

      Product to search for: "${productName}"

      Rules:
      1.  Find 5-7 fictional but realistic deals on Indian e-commerce platforms ('Flipkart', 'Amazon.in', 'Tata Cliq', 'Reliance Digital', 'Croma', 'Other').
      2.  The output MUST be a single, valid JSON array. Do not include any text, explanations, or markdown like \`\`\`json.
      3.  CRITICAL: All strings inside the JSON must be correctly escaped. If a string contains a double quote ("), it MUST be escaped with a backslash (\\"). See the example below.
      4.  Each object in the array must strictly follow this TypeScript interface:
          interface ProductDeal {
            productName: string;
            platform: 'Flipkart' | 'Amazon.in' | 'Tata Cliq' | 'Reliance Digital' | 'Croma' | 'Other';
            price: number; // in INR
            rating: number; // between 0 and 5
            imageUrl: string; // placeholder URL
            productUrl: string; // placeholder URL
          }

      Example for "27 inch monitor":
      [
        {
          "productName": "LG UltraGear 27\\" QHD Gaming Monitor",
          "platform": "Amazon.in",
          "price": 24999,
          "rating": 4.7,
          "imageUrl": "https://picsum.photos/seed/lgmonitor/400/400",
          "productUrl": "#"
        },
        {
          "productName": "Samsung Odyssey G5 27-inch",
          "platform": "Flipkart",
          "price": 22500,
          "rating": 4.5,
          "imageUrl": "https://picsum.photos/seed/samsungmonitor/400/400",
          "productUrl": "#"
        },
        {
            "productName": "BenQ EX2780Q 27 Inch 1440p",
            "platform": "Croma",
            "price": 28990,
            "rating": 4.6,
            "imageUrl": "https://picsum.photos/seed/benqmonitor/400/400",
            "productUrl": "#"
        }
      ]
    `;
}

export const fetchProductDeals = async (productName: string): Promise<ProductDeal[]> => {
  try {
    const prompt = createPrompt(productName);
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.5,
        }
    });

    const textResponse = response.text;
    
    let jsonStr = textResponse.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData) && parsedData.every(isValidProductDeal)) {
      // Sort by price ascending to have a default order
      return parsedData.sort((a, b) => a.price - b.price);
    } else {
      throw new Error('Received invalid data structure from API.');
    }
  } catch (error) {
    console.error("Error fetching or parsing product deals:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching deals.');
  }
};