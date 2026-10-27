import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatCityName, type City } from "@/lib/geocoding";

type CityPickerProps = {
    query: string,
    cities: City[],
}

export default function CityPicker({ query, cities }: CityPickerProps) {
    return (
        <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold">
                Znaleziono kilka miejscowości dla &quot;{query}&quot;
            </h2>
            <ul className="flex flex-col gap-2">
                {cities.map((city) => {
                    const params = new URLSearchParams({ city: query, id: String(city.id) });
                    return (
                        <li key={city.id}>
                            <Link
                                href={`/?${params}`}
                                className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50"
                            >
                                <MapPin className="size-5" />
                                <span>{formatCityName(city)}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}