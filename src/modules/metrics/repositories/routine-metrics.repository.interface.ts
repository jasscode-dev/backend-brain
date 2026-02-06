import { RoutineMetricsEntity } from "../entities";

export interface IRoutineMetricsRepository {
  saveMetrics(routineId: string, metrics: RoutineMetricsEntity): Promise<void>;
  getMetricsByRoutineId(routineId: string): Promise<RoutineMetricsEntity | null>;
  updateHighlights(routineId: string, highlights: string[]): Promise<void>;
  getUserRoutineMetrics(userId: string, limit?: number): Promise<RoutineMetricsEntity[]>;
}
