import { Suspense } from "react";
import CoordsWeatherResults from "@/components/CoordsWeatherResults";
import LocationButton from "@/components/LocationButton";
import SearchForm from "@/components/SearchForm";
import UnitsToggle from "@/components/UnitsToggle";
import WeatherResults from "@/components/WeatherResults";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import type { Units } from "@/lib/weather";

function parseCoordinate(value: string | string[] | undefined, limit: number): number | undefined {
    if (typeof value !== "string" || value.trim() === "") return undefined;
    const number = Number(value);
    return Number.isFinite(number) && Math.abs(number) <= limit ? number : undefined;
}

export default async function Home({ searchParams }: PageProps<"/">) {
    const params = await searchParams;
    const cityParam = params.city;
    const query = typeof cityParam === "string" ? cityParam.trim() : "";

    const idParam = params.id;
    const parsedId = typeof idParam === "string" ? Number(idParam) : NaN;
    const selectedId = Number.isInteger(parsedId) ? parsedId : undefined;

    const units: Units = params.units === "imperial" ? "imperial" : "metric";
    const lat = parseCoordinate(params.lat, 90);
    const lon = parseCoordinate(params.lon, 180);

    return (
        <main className="mx-auto w-full max-w-2xl p-8">
            <h1 className="mb-6 text-2xl font-bold">Pogodynka</h1>
            <SearchForm key={query} defaultValue={query} units={units} />
            <div className="mt-3 flex items-start justify-between gap-4">
                <LocationButton units={units} />
                <UnitsToggle
                    units={units}
                    city={query || undefined}
                    id={selectedId}
                    lat={query ? undefined : lat}
                    lon={query ? undefined : lon}
                />
            </div>

            {query ? (
                <Suspense key={`results-${query}-${selectedId ?? ""}-${units}`} fallback={<WeatherSkeleton />}>
                    <WeatherResults query={query} selectedId={selectedId} units={units} />
                </Suspense>
            ) : lat !== undefined && lon !== undefined ? (
                <Suspense key={`coords-${lat}-${lon}-${units}`} fallback={<WeatherSkeleton />}>
                    <CoordsWeatherResults lat={lat} lon={lon} units={units} />
                </Suspense>
            ) : null}
        </main>
    );
}
