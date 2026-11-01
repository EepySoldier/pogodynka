"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocateFixed } from "lucide-react";
import { buildHref } from "@/lib/urls";
import type { Units } from "@/lib/weather";

type LocationButtonProps = {
    units: Units,
}

export default function LocationButton({ units }: LocationButtonProps) {
    const router = useRouter();
    const [isLocating, setIsLocating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleClick() {
        if(!("geolocation" in navigator)) {
            setError("Twoja przeglądarka nie obsługuje geolokalizacji.");
            return;
        }

        setIsLocating(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsLocating(false);
                router.push(buildHref({ lat: position.coords.latitude, lon: position.coords.longitude, units }));
            },
            (geoError) => {
                setIsLocating(false);
                setError(
                    geoError.code === geoError.PERMISSION_DENIED
                        ? "Brak zgody na dostęp do lokalizacji."
                        : "Nie udało się ustalić lokalizacji.",
                );
            },
            { timeout: 10000 },
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleClick}
                disabled={isLocating}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
            >
                <LocateFixed className="size-4" />
                {isLocating ? "Szukam lokalizacji..." : "Użyj mojej lokalizacji"}
            </button>
            {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
