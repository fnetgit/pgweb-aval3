import type { Country } from "../services/api";

export const getCountryName = (country: Country): string => {
  return country.translations?.por?.common || country.name.common;
};

export const getCountryOfficialName = (country: Country): string => {
  return country.translations?.por?.official || country.name.official;
};
