export const delay = async (durationMS: number) =>
  new Promise((resolve, _reject) => setTimeout(resolve, durationMS));

export const spaceMorseFragment = () => delay(400);

export const spaceLetters = async () => {
  await delay(950);
};

export const spaceWord = async () => {
  // Double the length of time between each letter spacer.
  await spaceLetters();
  await spaceLetters();
};
