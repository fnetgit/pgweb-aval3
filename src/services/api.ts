const API_URL: string = "https://restcountries.com/v3.1";

export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Language {
  [key: string]: string;
}

export interface Country {
  name: CountryName;
  cca3: string;
  region: string;
  subregion?: string;
  population: number;
  flags: { png: string; svg: string; alt?: string };
  capital?: string[];
  tld?: string[];
  currencies?: { [key: string]: Currency };
  languages?: Language;
  borders?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
  latlng?: [number, number];
}

class CountryAPI {
  private static readonly BASE_URL = API_URL;

  private static async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAllCountries(): Promise<Country[]> {
    const fields = [
      "name",
      "cca3",
      "region",
      "subregion",
      "population",
      "flags",
      "capital",
      "tld",
      "currencies",
      "languages",
      "borders",
      "maps",
      "latlng",
    ].join(",");

    return this.fetchData<Country[]>(`${this.BASE_URL}/all?fields=${fields}`);
  }

  static async getCountryByCode(code: string): Promise<Country> {
    const data = await this.fetchData<Country[]>(
      `${this.BASE_URL}/alpha/${code}`
    );
    return data[0];
  }

  static async getCountriesByCodes(codes: string[]): Promise<Country[]> {
    if (codes.length === 0) return [];

    const codesString = codes.join(",");
    return this.fetchData<Country[]>(
      `${this.BASE_URL}/alpha?codes=${codesString}&fields=name,cca3,flags`
    );
  }
}

export const getAllCountries = () => CountryAPI.getAllCountries();
export const getCountryDetails = (code: string) =>
  CountryAPI.getCountryByCode(code);
export const getBorderCountries = (codes: string[]) =>
  CountryAPI.getCountriesByCodes(codes);
