export const randomInteger = (min: number, max: number) => {
  const randomNo = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(randomNo);
  return randomNo;
};
