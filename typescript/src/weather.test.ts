import { describe, it, expect } from 'vitest'
import { WeatherService, HttpClientFactory, formatWeatherOutput } from './weather'

describe('WeatherService', () => {
  it('throws an error for empty city name', async () => {
    const httpClient = HttpClientFactory.createNull({
      geocoding: { results: [] },
      weather: { current: { temperature_2m: 0, apparent_temperature: 0, precipitation: 0 } }
    })
    const service = new WeatherService(httpClient)

    await expect(service.getWeather('')).rejects.toThrow('City name is required')
  })

  it('throws an error when city is not found', async () => {
    const httpClient = HttpClientFactory.createNull({
      geocoding: { results: [] },
      weather: { current: { temperature_2m: 0, apparent_temperature: 0, precipitation: 0 } }
    })
    const service = new WeatherService(httpClient)

    await expect(service.getWeather('NonexistentCity123')).rejects.toThrow('City not found')
  })

  it('returns temperature in Fahrenheit for valid city', async () => {
    const httpClient = HttpClientFactory.createNull({
      geocoding: { results: [{ latitude: 40.7128, longitude: -74.006 }] },
      weather: { current: { temperature_2m: 72.5, apparent_temperature: 70, precipitation: 0 } }
    })
    const service = new WeatherService(httpClient)

    const weather = await service.getWeather('New York')

    expect(weather.temperature).toBe(72.5)
  })

  it('returns wind chill for valid city', async () => {
    const httpClient = HttpClientFactory.createNull({
      geocoding: { results: [{ latitude: 40.7128, longitude: -74.006 }] },
      weather: { current: { temperature_2m: 72.5, apparent_temperature: 68.0, precipitation: 0 } }
    })
    const service = new WeatherService(httpClient)

    const weather = await service.getWeather('New York')

    expect(weather.windChill).toBe(68.0)
  })

  it('returns precipitation for valid city', async () => {
    const httpClient = HttpClientFactory.createNull({
      geocoding: { results: [{ latitude: 40.7128, longitude: -74.006 }] },
      weather: { current: { temperature_2m: 72.5, apparent_temperature: 68.0, precipitation: 0.25 } }
    })
    const service = new WeatherService(httpClient)

    const weather = await service.getWeather('New York')

    expect(weather.precipitation).toBe(0.25)
  })
})

describe('formatWeatherOutput', () => {
  it('formats weather data for CLI display', () => {
    const weather = {
      temperature: 72.5,
      windChill: 68.0,
      precipitation: 0.25
    }

    const output = formatWeatherOutput('New York', weather)

    expect(output).toContain('New York')
    expect(output).toContain('72.5')
    expect(output).toContain('68')
    expect(output).toContain('0.25')
  })
})
