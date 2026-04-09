"use client";

import Link from "next/link";
import { Department } from "@/types";

interface Props {
  department: Department;
  score?: number;
  total?: number;
  completed: boolean;
}

export default function DepartmentCard({ department, score, total, completed }: Props) {
  const percentage = total ? Math.round(((score ?? 0) / total) * 100) : 0;

  return (
    <Link href={`/game/${department.id}`}>
      <div
        className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${department.bgColor} ${completed ? "ring-2 ring-green-400" : ""}`}
      >
        {completed && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Done ✓
          </span>
        )}
        <div className="text-4xl mb-3">{department.icon}</div>
        <h3 className={`font-bold text-sm mb-1 ${department.color}`}>
          {department.shortName}
        </h3>
        <p className="text-gray-500 text-xs leading-snug line-clamp-2">
          {department.description}
        </p>
        {completed && total && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Score</span>
              <span className="font-semibold">
                {score}/{total} ({percentage}%)
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
        {!completed && (
          <div className="mt-3">
            <span className={`text-xs font-semibold ${department.color} underline`}>
              Start quiz →
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
