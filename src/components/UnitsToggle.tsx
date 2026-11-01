import Link from "next/link";
import { buildHref } from "@/lib/urls";
import type { Units } from "@/lib/weather";

type UnitsToggleProps = {
    units: Units,
    city?: string,
    id?: number,
    lat?: number,
    lon?: number,
}

const OPTIONS: { value: Units, label: string }[] = [
    { value: "metric", label: "°C" },
    { value: "imperial", label: "°F" },
];

export default function UnitsToggle({ units, ...location }: UnitsToggleProps) {
    return (
        <nav aria-label="Jednostki" className="flex overflow-hidden rounded-lg border border-gray-300 text-sm">
            {OPTIONS.map((option) => {
                const isActive = option.value === units;
                return (
                    <Link
                        key={option.value}
                        href={buildHref({ ...location, units: option.value })}
                        aria-current={isActive ? "true" : undefined}
                        className={`px-3 py-1 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-50"}`}
                    >
                        {option.label}
                    </Link>
                );
            })}
        </nav>
    );
}
