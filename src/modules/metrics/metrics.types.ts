import { Category, StatusTask } from "src/generated/prisma";

export const XP_CONFIG = {
    baseTask: 10,
    onTimeBonus: 5,
    categoryBonus: {
        WORK: 2,
        PERSONAL: 0,
        BREAK: 0,
        STUDY: 3
    },
    xpPerLevel: 100 
}

export type TaskXpInput = {
    status: StatusTask
    category: Category;
    plannedEnd: Date;
    finishedAt: Date | null;
}

export type RoutineMetricsInput = {
    completedTasks: number;
    totalTasks: number;
    totalSeconds: number;
    tasks: TaskMetricData[];
}

export type TaskMetricData = {
    status: StatusTask;
    category: Category;
    plannedEnd: Date;
    finishedAt: Date | null;
    plannedStart: Date;
    startedAt: Date | null;
    actualDurationSec: number;
    durationSec: number;
}

export type RoutineMetrics = {
    completionRate: number;
    xpEarned: number;
    avgTimePerTask: number;
    timeAccuracy: number;
    categoryDistribution: Record<Category, number>;
    totalSeconds: number;
    highlights: string[];
}

export type RoutineHighlight = 
    | "PERFECT_ROUTINE"
    | "SPEED_RUNNER" 
    | "CONSISTENT_WORKER"
    | "CATEGORY_MASTER"
    | "XP_MACHINE"
    | "STREAK_BUILDER"
    | "MARATHON"
