"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAccumulatedSeconds = exports.timeToSeconds = void 0;
const timeToSeconds = (time) => {
    const [h, m] = time.split(":").map(Number);
    return (h * 3600) + (m * 60);
};
exports.timeToSeconds = timeToSeconds;
const calculateAccumulatedSeconds = (startedAt, currentTotal) => {
    const now = new Date().getTime();
    const elapsedMs = now - startedAt.getTime();
    return currentTotal + Math.round(elapsedMs / 1000);
};
exports.calculateAccumulatedSeconds = calculateAccumulatedSeconds;
