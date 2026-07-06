import { askFireworks } from "./fireworksService.js";

export async function analyzeSecurity(log) {
  const prompt = `
You are an Expert Cyber Security Analyst.

Analyze the following security log.

Return GitHub Markdown.

Use this structure:

# Threat Level

Low / Medium / High / Critical

# Summary

Explain what happened.

# Indicators

- List suspicious events

# Recommendations

- Best practices
- Mitigation steps

# Commands

Provide PowerShell, CMD or Linux commands to investigate.

Security Log:

${log}
`;

  return await askFireworks(prompt);
}