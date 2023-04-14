export type MorseFragments = "." | "-";

export const getMorseCharacterFragments = ({
  character,
}: {
  character: string;
}): MorseFragments[] => {
  switch (character.toLocaleLowerCase()) {
    case "a":
      return [".", "-"];

    case "b":
      return ["-", ".", ".", "."];

    case "c":
      return ["-", ".", "-", "."];

    case "d":
      return ["-", ".", "."];

    case "e":
      return ["."];

    case "f":
      return [".", ".", "-", "."];

    case "g":
      return ["-", "-", "."];

    case "h":
      return [".", ".", ".", "."];

    case "i":
      return [".", "."];

    case "j":
      return [".", "-", "-"];

    case "k":
      return ["-", ".", "-"];

    case "l":
      return [".", "-", ".", "."];

    case "m":
      return ["-", "-"];

    case "n":
      return ["-", "."];

    case "o":
      return ["-", "-", "-"];

    case "p":
      return [".", "-", "-", "."];

    case "q":
      return ["-", "-", ".", "-"];

    case "r":
      return [".", "-", "."];

    case "s":
      return [".", ".", "."];

    case "t":
      return ["-"];

    case "u":
      return [".", ".", "-"];

    case "v":
      return [".", ".", ".", "-"];

    case "w":
      return [".", "-", "-"];

    case "x":
      return ["-", ".", ".", "-"];

    case "y":
      return ["-", ".", "-", "-"];

    case "z":
      return ["-", "-", ".", "."];

    case "0":
      return ["-", "-", "-", "-", "-"];

    case "1":
      return [".", "-", "-", "-", "-"];

    case "2":
      return [".", ".", "-", "-", "-"];

    default:
      return [];
  }
};
