export type CurrentWeather = {
    time: string,
    temperature: number,
    humidity: number,
    windSpeed: number,
    weatherCode: number,
}

export type DailyForecast = {
    date: string,
    weatherCode: number,
    tempMax: number,
    tempMin: number,
}

export type Weather = {
    current: CurrentWeather,
    daily: DailyForecast[],
    units: {
        temperature: string,
        windSpeed: string,
    },
}

type ForecastResponse = {
    current: {
        time: string,
        temperature_2m: number,
        relative_humidity_2m: number,
        wind_speed_10m: number,
        weather_code: number,
    },
    current_units: {
        temperature_2m: string,
        wind_speed_10m: string,
    },
    daily: {
        time: string[],
        weather_code: number[],
        temperature_2m_max: number[],
        temperature_2m_min: number[],
    },
}

export async function getWeather(latitude: number, longitude: number, days = 5): Promise<Weather> {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        forecast_days: String(days),
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { next: { revalidate: 600 } });
    if(!response.ok){
        throw new Error(`Weather server error: ${response.status} ${response.statusText}`);
    }
    const data: ForecastResponse = await response.json();

    return {
        current: {
            time: data.current.time,
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code,
        },
        daily: data.daily.time.map((date, i) => ({
            date,
            weatherCode: data.daily.weather_code[i],
            tempMax: data.daily.temperature_2m_max[i],
            tempMin: data.daily.temperature_2m_min[i],
        })),
        units: {
            temperature: data.current_units.temperature_2m,
            windSpeed: data.current_units.wind_speed_10m,
        },
    };
}