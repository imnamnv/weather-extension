const API_KEY = "53ef55db9ff41790ec1e9313de5c5ec1";

export interface OpenWeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
  [key: string]: any;
}

export type OpenWeatherTempScale = "metric" | "imperial";

export async function fetchOpenWeatherData(
  city: string = "hanoi",
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("City not found");

  const data: OpenWeatherData = await res.json();

  return data;
}

export function getWeatherIconSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
