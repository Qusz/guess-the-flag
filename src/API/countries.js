export default async function getCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');

    if (!response.ok) {
      throw new Error(`Can't load data... ${response.status} ${response.statusText}`);
    }

    const data = await response.json()
    return data;

  } catch (error) {
    throw new Error(error);
  }
}