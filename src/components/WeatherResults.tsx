import CityPicker from "@/components/CityPicker";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastList from "@/components/ForecastList";
import { getCityData, type City } from "@/lib/geocoding";
import { getWeather, type Weather } from "@/lib/weather";

type WeatherResultsProps = {
    query: string,
    selectedId?: number,
}

export default async function WeatherResults({ query, selectedId }: WeatherResultsProps) {
    let cities: City[] = [];
    let city: City | undefined;
    let weather: Weather | null = null;
    let errorMessage: string | null = null;

    try {
        cities = await getCityData(query);
        city = cities.find((item) => item.id === selectedId) ?? (cities.length === 1 ? cities[0] : undefined);
        if (city) {
            weather = await getWeather(city.latitude, city.longitude);
        }
    } catch {
        errorMessage = "Nie udało się załadować danych pogodowych. Spróbuj ponownie później.";
    }

    if (errorMessage) {
        return (
            <p role="alert" className="mt-6 text-red-600">
                {errorMessage}
            </p>
        );
    }

    if (cities.length === 0) {
        return <p className="mt-6">Nie znaleziono miasta dla &quot;{query}&quot;.</p>;
    }

    if (!city || !weather) {
        return <CityPicker query={query} cities={cities} />;
    }

    return (
        <div className="mt-6 flex flex-col gap-6">
            <CurrentWeatherCard city={city} weather={weather} />
            <ForecastList daily={weather.daily} unit={weather.units.temperature} />
        </div>
    );
}