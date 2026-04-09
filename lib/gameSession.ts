import { GameSession, DepartmentScore } from "@/types";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

function sessionKey(userId: string) {
  return `career_game_session_${userId}`;
}

export function getOrCreateSession(userId: string): GameSession {
  if (typeof window === "undefined") return createNewSession(userId);
  const stored = localStorage.getItem(sessionKey(userId));
  if (stored) return JSON.parse(stored);
  const session = createNewSession(userId);
  saveSession(session, userId);
  return session;
}

function createNewSession(userId: string): GameSession {
  return {
    sessionId: crypto.randomUUID(),
    scores: {},
    completedDepartments: [],
    startedAt: Date.now(),
    userId,
  };
}

export function saveSession(session: GameSession, userId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(sessionKey(userId), JSON.stringify(session));
}

export function saveDepartmentScore(
  session: GameSession,
  departmentId: string,
  answers: boolean[],
  userId: string
): GameSession {
  const score = answers.filter(Boolean).length;
  const total = answers.length;
  const departmentScore: DepartmentScore = {
    departmentId,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    answers,
  };
  const updated: GameSession = {
    ...session,
    scores: { ...session.scores, [departmentId]: departmentScore },
    completedDepartments: Array.from(
      new Set([...session.completedDepartments, departmentId])
    ),
  };
  saveSession(updated, userId);
  return updated;
}

export function clearSession(userId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(sessionKey(userId));
}

export async function saveResultsToFirebase(
  session: GameSession,
  userId: string
): Promise<void> {
  try {
    const ref = doc(db, "users", userId, "sessions", session.sessionId);
    await setDoc(ref, { ...session, userId, completedAt: Date.now() });
  } catch (error) {
    console.error("Failed to save to Firebase:", error);
  }
}
