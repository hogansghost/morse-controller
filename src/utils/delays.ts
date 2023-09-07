const SPACE_LETTERS_DELAY = 950;
const SPACE_WORDS_DELAY = SPACE_LETTERS_DELAY * 2;

export const delay = async (durationMS: number) =>
  new Promise((resolve, _reject) => setTimeout(resolve, durationMS));

export const spaceMorseFragment = () => delay(400);

export const spaceLetters = async () => {
  await delay(SPACE_LETTERS_DELAY);
};

export const spaceWord = async () => {
  await delay(SPACE_WORDS_DELAY);
};
