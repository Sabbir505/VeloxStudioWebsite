import { GoogleGenAI } from "@google/genai";
import { CVData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseCVFromText = async (text: string): Promise<CVData> => {
  const model = "gemini-3-flash-preview";

  // Prompt that defines the schema in text, which is often more robust for preventing
  // hangs than the strict responseSchema in some preview environments.
  const prompt = `
    Act as an expert Resume Writer and Career Coach. 
    Your task is to parse the unstructured resume text below into a structured JSON format.
    
    You MUST return ONLY valid JSON. Do not include markdown formatting like \`\`\`json.

    ### JSON Structure Requirements:
    The JSON must match this structure exactly:
    {
      "personalInfo": {
        "fullName": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "website": "string (optional)",
        "linkedin": "string (optional)",
        "summary": "string"
      },
      "experience": [
        {
          "title": "Job Title",
          "subtitle": "Company Name",
          "date": "Date Range",
          "location": "Location",
          "description": ["Action-oriented bullet point 1", "Action-oriented bullet point 2"]
        }
      ],
      "education": [
        {
          "title": "Degree",
          "subtitle": "School/University",
          "date": "Date",
          "location": "Location",
          "description": ["Honors/Details"]
        }
      ],
      "skills": ["Skill 1", "Skill 2"],
      "projects": [
        {
          "title": "Project Title",
          "subtitle": "Tech Stack or Role",
          "date": "Date",
          "location": "Link/Location",
          "description": ["Project detail 1", "Project detail 2"]
        }
      ]
    }

    ### Content Polishing Instructions:
    1. **Experience**: Split paragraphs into distinct bullet points. Start with action verbs (e.g., "Spearheaded", "Engineered"). Highlight metrics.
    2. **Projects**: Use the 'subtitle' field for the Tech Stack (e.g. "React, Node.js").
    3. **General**: Standardize dates (e.g. "Jan 2020 - Present"). Fix typos.

    Resume Text:
    ${text}
  `;
  
  try {
    // Increased timeout to 60 seconds to allow the model enough time to process complex CVs
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request timed out - the model took too long to respond. Please try again.")), 60000)
    );

    const apiCall = ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const response: any = await Promise.race([apiCall, timeoutPromise]);

    if (response.text) {
      // Clean up potential markdown code blocks if the model adds them despite instructions
      const cleanText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanText) as CVData;
      
      // Inject default section order if missing
      return {
          ...parsed,
          sectionOrder: ['experience', 'education', 'skills', 'projects']
      };
    }
    
    throw new Error("No data returned from AI");
  } catch (error) {
    console.error("Gemini Parse Error:", error);
    throw error; // Re-throw to be caught by App.tsx
  }
};