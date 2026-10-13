import SearchForm from "@/components/SearchForm";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import { getCityData, type City } from "@/lib/geocoding";
import { getWeather, type Weather } from "@/lib/weather";

export default async function Home({ searchParams }: PageProps<"/">) {
    const params = await searchParams;
    const cityParam = params.city;
    const query = typeof cityParam === "string" ? cityParam.trim() : "";

    let city: City | undefined;
    let weather: Weather | null = null;
    let errorMessage: string | null = null;

    if (query) {
        try {
            const cities = await getCityData(query);
            city = cities[0];
            if (city) {
                weather = await getWeather(city.latitude, city.longitude);
            }
        } catch {
            errorMessage = "Could not load weather data. Please try again later.";
        }
    }

    return (
        <main className="mx-auto w-full max-w-2xl p-8">
            <h1 className="mb-6 text-2xl font-bold">Pogodynka</h1>
            <SearchForm key={query} defaultValue={query} />

            {errorMessage && (
                <p role="alert" className="mt-6 text-red-600">
                    {errorMessage}
                </p>
            )}

            {query && !errorMessage && !city && (
                <p className="mt-6">No city found for &quot;{query}&quot;.</p>
            )}

            {city && weather && (
                <div className="mt-6">
                    <CurrentWeatherCard city={city} weather={weather} />
                </div>
            )}
        </main>
    );
}