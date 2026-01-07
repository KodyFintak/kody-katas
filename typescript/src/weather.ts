declare const process: {
  argv: string[]
  exit(code: number): never
}

export interface HttpClient {
  fetch(url: string): Promise<unknown>
}

export interface WeatherData {
  temperature: number
  windChill: number
  precipitation: number
}

interface Coordinates {
  latitude: number
  longitude: number
}

interface GeocodingResponse {
  results: Coordinates[]
}

interface WeatherResponse {
  current: { temperature_2m: number; apparent_temperature: number; precipitation: number }
}

interface NullableResponses {
  geocoding: GeocodingResponse
  weather: WeatherResponse
}

export function formatWeatherOutput(city: string, weather: WeatherData): string {
  return `Weather for ${city}:
  Temperature: ${weather.temperature}°F
  Feels like: ${weather.windChill}°F
  Precipitation: ${weather.precipitation} in`
}

export function createHttpClient(): HttpClient {
  return {
    async fetch(url: string): Promise<unknown> {
      const response = await fetch(url)
      return response.json()
    }
  }
}

export function createNullableHttpClient(responses: NullableResponses): HttpClient {
  return {
    async fetch(url: string): Promise<unknown> {
      if (url.includes('geocoding')) {
        return responses.geocoding
      }
      return responses.weather
    }
  }
}

export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  async getWeather(city: string): Promise<WeatherData> {
    if (!city) {
      throw new Error('City name is required')
    }

    const geoResponse = await this.httpClient.fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    ) as GeocodingResponse

    if (!geoResponse.results || geoResponse.results.length === 0) {
      throw new Error('City not found')
    }

    const { latitude, longitude } = geoResponse.results[0]

    const weatherResponse = await this.httpClient.fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation&temperature_unit=fahrenheit`
    ) as WeatherResponse

    return {
      temperature: weatherResponse.current.temperature_2m,
      windChill: weatherResponse.current.apparent_temperature,
      precipitation: weatherResponse.current.precipitation
    }
  }
}

export async function main(args: string[]): Promise<void> {
  const city = args[0]
  if (!city) {
    console.error('Usage: npx ts-node src/weather.ts <city>')
    process.exit(1)
  }

  const httpClient = createHttpClient()
  const service = new WeatherService(httpClient)

  try {
    const weather = await service.getWeather(city)
    console.log(formatWeatherOutput(city, weather))
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

if (process.argv[1]?.includes('weather')) {
  main(process.argv.slice(2))
}
