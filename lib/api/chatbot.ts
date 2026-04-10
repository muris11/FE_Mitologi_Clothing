import { ENDPOINTS } from "./endpoints";
import { apiFetch } from "./index";

/** Message structure for chatbot conversation history */
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Send a message to the AI chatbot and receive a reply.
 * @param message - User's message text
 * @param history - Previous conversation messages for context
 * @returns The chatbot's reply string
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = [],
): Promise<string> {
  try {
    const res = await apiFetch<{ reply: string }>(ENDPOINTS.CHATBOT, {
      method: "POST",
      body: JSON.stringify({ message, history }),
    });
    return res.reply;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status: number }).status === 503
    ) {
      throw new Error("Chatbot service is currently unavailable.");
    }
    throw new Error("Gagal mengirim pesan. Silakan coba lagi nanti.");
  }
}
