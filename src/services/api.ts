const API_URL = "https://restcountries.com/v3.1" as const;

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

export interface Country {
  name: CountryName;
  translations?: {
    por?: {
      official: string;
      common: string;
    };
    [key: string]:
      | {
          official: string;
          common: string;
        }
      | undefined;
  };
  cca3: string;
  region: string;
  subregion?: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
  borders?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
  latlng?: [number, number];
  area?: number;
}

export class APIError extends Error {
  statusCode?: number;
  endpoint?: string;

  constructor(message: string, statusCode?: number, endpoint?: string) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.endpoint = endpoint;
  }
}

class CountryAPIService {
  private static readonly BASE_URL = API_URL;
  private static readonly TIMEOUT = 10000;

  private static async fetchWithTimeout(
    url: string,
    timeout: number = this.TIMEOUT
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new APIError("Tempo de requisição esgotado. Tente novamente.", 408, url);
      }
      if (error instanceof TypeError) {
        throw new APIError("Erro de conexão. Verifique sua internet e tente novamente.", undefined, url);
      }
      throw error;
    }
  }

  private static async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new APIError("Recurso não encontrado", 404, url);
        }
        if (response.status >= 500) {
          throw new APIError("Erro no servidor. Tente novamente mais tarde.", response.status, url);
        }
        throw new APIError(
          `Erro na requisição (${response.status})`,
          response.status,
          url
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        "Erro ao processar resposta da API",
        undefined,
        url
      );
    }
  }

  static async getAllCountries(): Promise<Country[]> {
    const strategies = [
      `${this.BASE_URL}/all?fields=name,translations,flags,population,region,capital,cca3`,
      `${this.BASE_URL}/all?fields=name,translations,flags,population,region,capital,cca3,subregion,tld`,
      `${this.BASE_URL}/all`,
    ];

    for (let i = 0; i < strategies.length; i++) {
      try {
        return await this.fetchData<Country[]>(strategies[i]);
      } catch {
        if (i === strategies.length - 1) {
          throw new APIError(
            "Não foi possível carregar os países. Tente novamente mais tarde.",
            undefined,
            "all strategies failed"
          );
        }
      }
    }

    throw new APIError("Falha ao carregar dados dos países");
  }

  static async getCountryByCode(code: string): Promise<Country> {
    if (!code || code.length !== 3) {
      throw new APIError("Código do país inválido", 400);
    }

    try {
      const data = await this.fetchData<Country[]>(
        `${this.BASE_URL}/alpha/${code.toUpperCase()}`
      );

      if (!data || data.length === 0) {
        throw new APIError("País não encontrado", 404);
      }

      return data[0];
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(
        "Erro ao buscar detalhes do país",
        undefined,
        `/alpha/${code}`
      );
    }
  }

  static async getCountriesByCodes(codes: string[]): Promise<Country[]> {
    if (!codes?.length) {
      return [];
    }

    const validCodes = codes.filter((code) => code?.length === 3);
    if (!validCodes.length) {
      return [];
    }

    try {
      const codesString = validCodes.map((c) => c.toUpperCase()).join(",");
      return await this.fetchData<Country[]>(
        `${this.BASE_URL}/alpha?codes=${codesString}`
      );
    } catch {
      return [];
    }
  }
}

export const getAllCountries = (): Promise<Country[]> =>
  CountryAPIService.getAllCountries();

export const getCountryDetails = (code: string): Promise<Country> =>
  CountryAPIService.getCountryByCode(code);

export const getBorderCountries = (codes: string[]): Promise<Country[]> =>
  CountryAPIService.getCountriesByCodes(codes);

export const getCountryNameInPortuguese = (country: Country): string => {
  return country.translations?.por?.common || country.name.common;
};
