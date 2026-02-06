import { Category } from "src/generated/prisma";
import { RoutineMetrics, RoutineHighlight } from "../metrics.types";

export class RoutineMetricsEntity {
  routineId: string;
  completionRate: number;
  xpEarned: number;
  avgTimePerTask: number;
  timeAccuracy: number;
  categoryDistribution: Record<Category, number>;
  totalSeconds: number;
  highlights: RoutineHighlight[];

  constructor(routineId: string, metrics: RoutineMetrics) {
    this.routineId = routineId;
    this.completionRate = metrics.completionRate;
    this.xpEarned = metrics.xpEarned;
    this.avgTimePerTask = metrics.avgTimePerTask;
    this.timeAccuracy = metrics.timeAccuracy;
    this.categoryDistribution = metrics.categoryDistribution;
    this.totalSeconds = metrics.totalSeconds;
    this.highlights = metrics.highlights as RoutineHighlight[];
  }

  toJSON() {
    return {
      routineId: this.routineId,
      completionRate: this.completionRate,
      xpEarned: this.xpEarned,
      avgTimePerTask: this.avgTimePerTask,
      timeAccuracy: this.timeAccuracy,
      categoryDistribution: this.categoryDistribution,
      totalSeconds: this.totalSeconds,
      highlights: this.highlights,
    };
  }

  toPersist() {
    return {
      completionRate: this.completionRate,
      xpEarned: this.xpEarned,
      avgTimePerTask: this.avgTimePerTask,
      timeAccuracy: this.timeAccuracy,
      categoryDistribution: JSON.stringify(this.categoryDistribution),
      totalSeconds: this.totalSeconds,
      highlights: JSON.stringify(this.highlights),
    };
  }
}
