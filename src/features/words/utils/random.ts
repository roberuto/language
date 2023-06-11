export const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffle = (arr: any[]) => {
  const copyOfArray = arr.slice();
  let currIdx = arr.length;
  let rndInx = null;

  while (currIdx != 0) {
    rndInx = Math.floor(Math.random() * currIdx);
    currIdx--;

    [copyOfArray[currIdx], copyOfArray[rndInx]] = [copyOfArray[rndInx], copyOfArray[currIdx]];
  }

  return copyOfArray;
};
