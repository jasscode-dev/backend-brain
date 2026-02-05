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
    status:StatusTask
    category: Category;
    plannedEnd: Date;
    finishedAt: Date | null;

}
