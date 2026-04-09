import { GameSession, DepartmentScore } from "@/types";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SESSION_KEY = "career_game_session";

export function getOrCreateSession(): GameSession {
  if (typeof window === "undefined") {
    return createNewSession();
  }
  const stored = localStorage.getItem(SESSION_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  const session = createNewSession();
  saveSession(session);
  return session;
}

function createNewSession(): GameSession {
  return {
    sessionId: crypto.randomUUID(),
    scores: {},
    completedDepartments: [],
    startedAt: Date.now(),
  };
}

export function saveSession(session: GameSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function saveDepartmentScore(
  session: GameSession,
  departmentId: string,
  answers: boolean[]
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
  saveSession(updated);
  return updated;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export async function saveResultsToFirebase(session: GameSession): Promise<void> {
  try {
    const sessionRef = doc(db, "sessions", session.sessionId);
    await setDoc(sessionRef, {
      ...session,
      completedAt: Date.now(),
    });
  } catch (error) {
    console.error("Failed to save to Firebase:", error);
  }
}
