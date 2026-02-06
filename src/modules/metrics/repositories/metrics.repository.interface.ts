import { UserMetrics } from "../entities";

export interface IMetricsRepository {
  getUserMetrics(userId: string): Promise<UserMetrics | null>;
  saveUserMetrics(metrics: UserMetrics): Promise<UserMetrics>;
  updateLevel(userId: string, level: number): Promise<void>;
  updateXp(userId: string, xp: number): Promise<void>;
  updateStars(userId: string, stars: number): Promise<void>;
}
