export interface Question {
  id: number;
  text: string;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  questions: Question[];
}

export interface DepartmentScore {
  departmentId: string;
  score: number;
  total: number;
  percentage: number;
  answers: boolean[];
}

export interface GameSession {
  sessionId: string;
  scores: Record<string, DepartmentScore>;
  completedDepartments: string[];
  startedAt: number;
  completedAt?: number;
}
