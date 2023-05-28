export const loadFile = async (filename: string) => {
  const request = await fetch(filename);
  return await request.text();
};
