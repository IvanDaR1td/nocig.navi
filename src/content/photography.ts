export interface Photograph {
  /** Stable id; match photography.items.<id> in BOTH locale files. */
  id: string;
  /** Relative to public/, never a Mac absolute path. */
  src: string;
  /** Actual pixel dimensions; prevents layout shifts, preserves framing. */
  width: number;
  height: number;
}

/**
 * Intentionally empty: no stock / generated photo is passed off as Ivan's work.
 * See PHOTOGRAPHY.md to add originals and their bilingual captions.
 * Example shape (not a live entry):
 * { id: 'nightWalk', src: 'images/photography/night-walk.jpg', width: 3000, height: 2000 }
 */
export const photographs: Photograph[] = [];
