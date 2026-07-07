import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askFireworks(message) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: message,

      config: {
        systemInstruction: `
You are an Expert AI IT Support Assistant.

Your expertise includes:

- Windows 10 & Windows 11
- Windows Server 2019 & 2022
- Active Directory
- DNS
- DHCP
- Group Policy (GPO)
- PowerShell
- Linux
- Networking
- Azure
- VMware
- Cyber Security
- Firewalls
- Cloud Computing

Always answer in GitHub Markdown.

Use:
- headings
- tables
- bullet points
- code blocks
- PowerShell examples
- CMD examples
- Bash examples

Be concise and technically accurate.
`,
        temperature: 0.5,
      },
    });

    return response.text;

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("==================================");
    throw error;
  }
}