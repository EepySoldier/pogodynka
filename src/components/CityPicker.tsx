import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatCityName, type City } from "@/lib/geocoding";
import { buildHref } from "@/lib/urls";
import type { Units } from "@/lib/weather";

type CityPickerProps = {
    query: string,
    cities: City[],
    units: Units,
}

export default function CityPicker({ query, cities, units }: CityPickerProps) {
    return (
        <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold">
                Znaleziono kilka miejscowości dla &quot;{query}&quot;
            </h2>
            <ul className="flex flex-col gap-2">
                {cities.map((city) => (
                    <li key={city.id}>
                        <Link
                            href={buildHref({ city: query, id: city.id, units })}
                            className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50"
                        >
                            <MapPin className="size-5" />
                            <span>{formatCityName(city)}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
