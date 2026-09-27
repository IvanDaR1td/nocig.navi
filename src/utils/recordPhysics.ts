/** A record collection has real ends; a fast flick never skips more than three sleeves. */
export const clampRecord = (index: number, count: number) => Math.max(0, Math.min(count - 1, Math.round(index)));
export const projectRecord = (position: number, velocity: number, count: number) => clampRecord(position + Math.max(-3, Math.min(3, velocity * .18)), count);
