export const timeToSeconds = (time: string): number => {
    const [h, m] = time.split(":").map(Number)
    return (h * 3600) + (m * 60)
}

export const calculateAccumulatedSeconds = (startedAt: Date, currentTotal: number): number => {
    const now = new Date().getTime();
    const elapsedMs = now - startedAt.getTime();
    return currentTotal + Math.round(elapsedMs / 1000);
}


