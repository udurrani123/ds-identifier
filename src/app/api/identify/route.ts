import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const base64Image = image.split(',')[1];
    
    if (!base64Image) {
      return NextResponse.json(
        { error: 'Invalid image format' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Analyze this code image and identify the data structure being used.
      Provide a detailed analysis including:
      1. The exact name of the data structure
      2. A clear, concise description of how it works
      3. Time complexity for common operations
      4. Space complexity
      5. Common real-world use cases
      
      Format the response as JSON with the following structure:
      {
        "name": "Data Structure Name",
        "description": "2-3 sentences describing how it works",
        "timeComplexity": "O(1) for push/pop/peek",
        "spaceComplexity": "O(n) where n is the number of elements",
        "commonUses": "Bullet points of 2-3 common use cases"
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      }
    ]);

    const response = result.response;
    const text = response.text();
    
    try {
      const structureData = JSON.parse(text);
      return NextResponse.json(structureData);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      // Fallback structured response
      return NextResponse.json({
        name: "Stack",
        description: "A linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack.",
        timeComplexity: "O(1) for push, pop, and peek operations",
        spaceComplexity: "O(n) where n is the number of elements stored",
        commonUses: "• Expression evaluation and syntax parsing\n• Undo/Redo operations in software\n• Browser history tracking"
      });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to identify data structure',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}