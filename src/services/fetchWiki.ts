export const fetchWikiExtract = async (city: string) => {
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${city}&prop=extracts&exlimit=max&format=json&origin=*`);
    return await response.json();
  } catch (e) {
    console.log(e)
  }
};
