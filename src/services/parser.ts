export async function parseText(text: string, delimiter: string) {
  const arr = text.split('\n');

  return arr.map((line) => {
    const [kanji, kana, romaji, meaning] = line.split(delimiter);
    return { kanji, kana, romaji, meaning };
  });
}
