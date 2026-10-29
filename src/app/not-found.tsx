import Link from "next/link";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 p-8 text-center">
            <MapPinOff className="size-12 text-gray-500" />
            <h1 className="text-2xl font-bold">
                Nie znaleziono strony
            </h1>
            <p className="text-gray-600">
                Strona, której szukasz, nie istnieje.
            </p>
            <Link href="/" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                Wróć do wyszukiwarki
            </Link>
        </main>
    );
}