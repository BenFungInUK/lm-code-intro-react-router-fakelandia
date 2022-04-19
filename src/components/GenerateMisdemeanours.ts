export const MISDEMEANOURS = [
  "rudeness",
  "vegetables",
  "lift",
  "united",
] as const;

export const MISDEMEANOURS_MAPPING = {
  rudeness: { emoji: "🤪", subject: "Mild Public Rudeness", detail: "" },
  vegetables: {
    emoji: "🥗",
    subject: "Not Eating Your Vegetables",
    detail: "",
  },
  lift: { emoji: "🗣", subject: "Speaking in a Lift", detail: "" },
  united: { emoji: "😈", subject: "Supporting Manchester United", detail: "" },
} as const;

export type Misdemeanour = typeof MISDEMEANOURS[number];
export type MisdemeanourContent = {
  emoji: string;
  subject: string;
  detail: string;
};

export type MisdemeanourObj = {
  citizenId: number;
  misdemeanour: Misdemeanour;
  content: MisdemeanourContent;
  date: string;
};

export default async function generateMisdemeanours(
  number: number
): Promise<Array<MisdemeanourObj>> {
  // pretend this is an API we're calling, wait 1.5s
  await sleep(1500);

  let amount = number ?? 50;

  const misdemeanours = [];

  for (let i = 0; i < amount; i++) {
    const tmpMisdemeanours = choose<Misdemeanour>([...MISDEMEANOURS]);

    misdemeanours.push({
      citizenId: Math.floor(i + rand(37) * rand(967)),
      misdemeanour: tmpMisdemeanours,
      content: MISDEMEANOURS_MAPPING[tmpMisdemeanours],
      date: new Date().toLocaleDateString(),
    });
  }

  return misdemeanours;
}

function rand(x: number): number {
  return Math.random() * x;
}

/// take just one T from an array of T
function choose<T>(arr: Array<T>): T {
  if (!arr) arr = [];
  return arr[Math.floor(Math.random() * arr.length)];
}

// In the real world, you wouldn't want to fake a 'sleep' like this, but for our purposes of faking an API
// this quick-and-dirty solution will do the job.
const sleep = async (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
