export interface SrsCard {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  dueDate: Date;
}

export function updateCard(
  card: SrsCard,
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  today: Date = new Date()
): SrsCard {
  let { easeFactor, intervalDays, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + intervalDays);

  return { easeFactor, intervalDays, repetitions, dueDate };
}
