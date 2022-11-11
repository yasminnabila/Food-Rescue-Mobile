

export async function searchCharacters(search) {
  try {
    const res = await fetch(
      `https://testing-savvie.herokuapp.com/search?name=${search}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}