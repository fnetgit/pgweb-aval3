const API_URL: string = "https://restcountries.com/v3.1";

export interface Country {
  name: { common: string; official: string };
  cca3: string;
  region: string;
  subregion?: string;
  population: number;
  flags: { png: string; svg: string; alt?: string };
  capital?: string[];
}

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    `${API_URL}/all?fields=name,cca3,region,subregion,population,flags,capital`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
};

export const getCountryDetails = async (code: string) => {
  const response = await fetch(`${API_URL}/alpha/${code}`);
  if (!response.ok) throw new Error("Failed to fetch country details");
  return response.json();
};
