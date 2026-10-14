import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastList from "@/components/ForecastList";
import { getCityData, type City } from "@/lib/geocoding";
import { getWeather, type Weather } from "@/lib/weather";

type WeatherResultsProps = {
    query: string,
}

export default async function WeatherResults({ query }: WeatherResultsProps) {
    let city: City | undefined;
    let weather: Weather | null = null;
    let errorMessage: string | null = null;

    try {
        const cities = await getCityData(query);
        city = cities[0];
        if (city) {
            weather = await getWeather(city.latitude, city.longitude);
        }
    } catch {
        errorMessage = "Nie udało się załadować danych pogodowych. Spróbuj ponownie później.";
    }

    if (errorMessage) {
        return (
            <p className="mt-6 text-red-600">
                {errorMessage}
            </p>
        );
    }

    if (!city || !weather) {
        return <p className="mt-6">Nie znaleziono miasta dla &quot;{query}&quot;.</p>;
    }

    return (
        <div className="mt-6 flex flex-col gap-6">
            <CurrentWeatherCard city={city} weather={weather} />
            <ForecastList daily={weather.daily} unit={weather.units.temperature} />
        </div>
    );
}