import { PrismaClient } from "@prisma/client";
import { RoutineMetricsEntity } from "../entities";
import { IRoutineMetricsRepository } from "./routine-metrics.repository.interface";

export class RoutineMetricsRepository implements IRoutineMetricsRepository {
  constructor(private prisma: PrismaClient) {}

  async saveMetrics(
    routineId: string,
    metrics: RoutineMetricsEntity
  ): Promise<void> {
    const data = metrics.toPersist();

    // Criar ou atualizar RoutineMetrics
    await this.prisma.routineMetrics.upsert({
      where: { routineId },
      update: data,
      create: {
        routineId,
        ...data,
      },
    });
  }

  async getMetricsByRoutineId(
    routineId: string
  ): Promise<RoutineMetricsEntity | null> {
    const metrics = await this.prisma.routineMetrics.findUnique({
      where: { routineId },
    });

    if (!metrics) {
      return null;
    }

    return new RoutineMetricsEntity(routineId, {
      completionRate: metrics.completionRate,
      xpEarned: metrics.xpEarned,
      avgTimePerTask: metrics.avgTimePerTask,
      timeAccuracy: metrics.timeAccuracy,
      categoryDistribution: JSON.parse(metrics.categoryDistribution),
      totalSeconds: metrics.totalSeconds,
      highlights: JSON.parse(metrics.highlights),
    });
  }

  async updateHighlights(
    routineId: string,
    highlights: string[]
  ): Promise<void> {
    await this.prisma.routineMetrics.update({
      where: { routineId },
      data: { highlights: JSON.stringify(highlights) },
    });
  }

  async getUserRoutineMetrics(
    userId: string,
    limit: number = 10
  ): Promise<RoutineMetricsEntity[]> {
    const metrics = await this.prisma.routineMetrics.findMany({
      where: { routine: { userId } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return metrics.map(
      m =>
        new RoutineMetricsEntity(m.routineId, {
          completionRate: m.completionRate,
          xpEarned: m.xpEarned,
          avgTimePerTask: m.avgTimePerTask,
          timeAccuracy: m.timeAccuracy,
          categoryDistribution: JSON.parse(m.categoryDistribution),
          totalSeconds: m.totalSeconds,
          highlights: JSON.parse(m.highlights),
        })
    );
  }
}
