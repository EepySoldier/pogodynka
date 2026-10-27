import { Suspense } from "react";
import SearchForm from "@/components/SearchForm";
import WeatherResults from "@/components/WeatherResults";
import WeatherSkeleton from "@/components/WeatherSkeleton";

export default async function Home({ searchParams }: PageProps<"/">) {
    const params = await searchParams;
    const cityParam = params.city;
    const query = typeof cityParam === "string" ? cityParam.trim() : "";

    const idParam = params.id;
    const parsedId = typeof idParam === "string" ? Number(idParam) : NaN;
    const selectedId = Number.isInteger(parsedId) ? parsedId : undefined;

    return (
        <main className="mx-auto w-full max-w-2xl p-8">
            <h1 className="mb-6 text-2xl font-bold">Pogodynka</h1>
            <SearchForm key={query} defaultValue={query} />

            {query && (
                <Suspense key={`results-${query}-${selectedId ?? ""}`} fallback={<WeatherSkeleton />}>
                    <WeatherResults query={query} selectedId={selectedId} />
                </Suspense>
            )}
        </main>
    );
}