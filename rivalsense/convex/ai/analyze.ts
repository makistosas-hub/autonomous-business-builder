import { action } from "../_generated/server";
import { v } from "convex/values";

/**
 * Send change data to OpenRouter API for AI-powered analysis.
 * Returns an analysis string summarizing strategic implications.
 */
export const analyzeChange = action({
  args: {
    changeId: v.id("changes"),
    competitorName: v.string(),
    module: v.union(
      v.literal("pricing"),
      v.literal("product"),
      v.literal("website"),
      v.literal("hiring"),
      v.literal("positioning")
    ),
    changeType: v.string(),
    title: v.string(),
    summary: v.string(),
    rawData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      throw new Error("OPENROUTER_API_KEY environment variable is not set");
    }

    const model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rivalsense.com";

    const systemPrompt = `You are a competitive intelligence analyst for RivalSense, a B2B SaaS platform that monitors competitor activity.

Your job is to analyze competitor changes and provide actionable strategic insights in 2-3 concise sentences. Focus on:
1. What the change signals about the competitor's strategy or direction
2. Potential impact on the market or customers
3. One concrete action the user's company could take in response

Be direct, specific, and avoid generic advice. Respond with plain text only.`;

    const userMessage = `Analyze this competitor change:

Competitor: ${args.competitorName}
Module: ${args.module}
Change Type: ${args.changeType}
Title: ${args.title}
Summary: ${args.summary}
${args.rawData ? `Raw Data: ${JSON.stringify(args.rawData, null, 2)}` : ""}

Provide a strategic analysis.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": appUrl,
        "X-Title": "RivalSense",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `OpenRouter API error ${response.status}: ${errorBody}`
      );
    }

    const data = await response.json();

    const analysis: string =
      data?.choices?.[0]?.message?.content?.trim() ?? "";

    if (!analysis) {
      throw new Error("OpenRouter returned an empty analysis");
    }

    return { analysis };
  },
});
