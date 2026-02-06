import { PrismaClient } from "@prisma/client";
import { UserMetrics } from "../entities";
import { IMetricsRepository } from "./metrics.repository.interface";

export class MetricsRepository implements IMetricsRepository {
  constructor(private prisma: PrismaClient) {}

  async getUserMetrics(userId: string): Promise<UserMetrics | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return new UserMetrics(
      user.id,
      user.level,
      user.xp,
      user.xp,
      user.stars
    );
  }

  async saveUserMetrics(metrics: UserMetrics): Promise<UserMetrics> {
    const updatedUser = await this.prisma.user.update({
      where: { id: metrics.userId },
      data: {
        level: metrics.level,
        xp: metrics.currentXp,
        stars: metrics.stars,
      },
    });

    return new UserMetrics(
      updatedUser.id,
      updatedUser.level,
      updatedUser.xp,
      updatedUser.xp,
      updatedUser.stars
    );
  }

  async updateLevel(userId: string, level: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { level },
    });
  }

  async updateXp(userId: string, xp: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { xp },
    });
  }

  async updateStars(userId: string, stars: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { stars },
    });
  }
}
