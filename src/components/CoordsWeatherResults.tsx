import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastList from "@/components/ForecastList";
import { getWeather, type Units, type Weather } from "@/lib/weather";

type CoordsWeatherResultsProps = {
    lat: number,
    lon: number,
    units: Units,
}

export default async function CoordsWeatherResults({ lat, lon, units }: CoordsWeatherResultsProps) {
    let weather: Weather | undefined;

    try {
        weather = await getWeather(lat, lon, units);
    } catch {}

    if (!weather) {
        return (
            <p role="alert" className="mt-6 text-red-600">
                Nie udało się załadować danych pogodowych. Spróbuj ponownie później.
            </p>
        );
    }

    return (
        <div className="mt-6 flex flex-col gap-6">
            <CurrentWeatherCard title="Twoja lokalizacja" weather={weather} />
            <ForecastList daily={weather.daily} unit={weather.units.temperature} />
        </div>
    );
}
