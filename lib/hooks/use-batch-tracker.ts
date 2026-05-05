"use client";

import { apiFetch, ENDPOINTS } from "lib/api";
import { useCallback, useEffect, useRef } from "react";

interface Interaction {
  productId: number;
  action: "view" | "cart" | "purchase";
  score?: number;
  timestamp: number;
}

const STORAGE_KEY = "pending_interactions";
const BATCH_INTERVAL = 30000; // 30 seconds

export function useBatchTracker() {
  const interactionsRef = useRef<Interaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      interactionsRef.current = JSON.parse(stored);
    }
  }, []);

  const saveToStorage = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(interactionsRef.current));
  }, []);

  const track = useCallback(
    (
      productId: number,
      action: "view" | "cart" | "purchase",
      score?: number,
    ) => {
      const interaction: Interaction = {
        productId,
        action,
        score,
        timestamp: Date.now(),
      };
      interactionsRef.current.push(interaction);
      saveToStorage();
    },
    [saveToStorage],
  );

  const sendBatch = useCallback(async () => {
    if (interactionsRef.current.length === 0) return;

    const batch = [...interactionsRef.current];
    interactionsRef.current = [];
    localStorage.removeItem(STORAGE_KEY);

    try {
      await apiFetch(ENDPOINTS.INTERACTIONS_BATCH, {
        method: "POST",
        body: JSON.stringify({
          interactions: batch.map((i) => ({
            productId: i.productId,
            action: i.action,
            score: i.score,
          })),
        }),
      });
    } catch (error) {
      interactionsRef.current = [...batch, ...interactionsRef.current];
      saveToStorage();
    }
  }, [saveToStorage]);

  useEffect(() => {
    const interval = setInterval(sendBatch, BATCH_INTERVAL);
    return () => {
      clearInterval(interval);
      sendBatch(); // Send remaining on unmount
    };
  }, [sendBatch]);

  return { track, sendBatch };
}
