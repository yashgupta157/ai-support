import { askFireworks } from "./fireworksService.js";

export async function generateCommand(prompt) {

  const systemPrompt = `
You are an Expert Windows Server,
PowerShell,
Linux,
Azure,
Networking,
Active Directory,
VMware Engineer.

Generate ONLY the command.

Return Markdown.

Example:

## PowerShell

\`\`\`powershell
Restart-Service DNS
\`\`\`

### Explanation

Restarts DNS Service.

### Notes

Requires Administrator privileges.
`;

  const finalPrompt = `
${systemPrompt}

User Request:

${prompt}
`;

  return await askFireworks(finalPrompt);
}