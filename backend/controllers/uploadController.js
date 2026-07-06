import { askFireworks } from "../services/fireworksService.js";

export async function analyzeLog(req, res) {
  // console.log("========== UPLOAD DEBUG ==========");
  // console.log("req.file:", req.file);
  // console.log("req.body:", req.body);
  // console.log("==================================");

   try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const logContent = req.file.buffer.toString("utf8");

    const prompt = `
You are a Senior IT Support Engineer with expertise in:

- Windows Server
- Active Directory
- DNS
- DHCP
- Linux
- Networking
- PowerShell
- Cybersecurity

Analyze the uploaded IT log.

STRICT RULES:

- Return ONLY valid Markdown.
- Every section MUST begin with ##.
- Use bullet points where appropriate.
- Commands MUST be inside markdown code blocks.
- Keep the response professional.
- Never use plain text headings.
- Do not add any introduction or conclusion.

Use EXACTLY this format:

## 📋 Summary

Brief summary of the issue.

---

## 🔍 Root Cause

- Cause 1
- Cause 2

---

## ⚠ Severity

Choose ONLY ONE:

- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🟢 Low

---

## 🛠 Recommended Fix

1. Step one
2. Step two
3. Step three

---

## 💻 Commands

For Windows:

\`\`\`powershell
command here
\`\`\`

For Linux (only if applicable):

\`\`\`bash
command here
\`\`\`

---

## 🚀 Prevention

- Tip 1
- Tip 2

---

## 📚 Explanation

Explain the issue in simple language for beginners.

Log File:

${logContent}
`;

    const analysis = await askFireworks(prompt);

    res.json({
      success: true,
      analysis,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}