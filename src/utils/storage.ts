import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export type LocalStorageKeys = keyof LocalStorage;

export interface LocalStorageOptions {
  hasAutoOverlay: boolean;
  tempScale: OpenWeatherTempScale;
  homeCity: string;
}

export function setStoredCities(cities: string[]): Promise<void> {
  return new Promise((resolve) => {
    const vals: LocalStorage = {
      cities,
    };
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? []);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options);
    });
  });
}
