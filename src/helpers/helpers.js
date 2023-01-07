export function clearArray(array) {
  array.splice(0, array.length);
}

export function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}