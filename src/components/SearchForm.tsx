"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { buildHref } from "@/lib/urls";
import type { Units } from "@/lib/weather";

type SearchFormProps = {
    defaultValue?: string,
    units?: Units,
}

export default function SearchForm({ defaultValue = "", units }: SearchFormProps) {
    const router = useRouter();
    const [city, setCity] = useState(defaultValue);

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const query = city.trim();
        if (!query) return;
        router.push(buildHref({ city: query, units }));
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Wprowadź nazwę miasta"
                aria-label="Nazwa miasta"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
            />
            <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                <Search className="size-4" />
                Szukaj
            </button>
        </form>
    );
}