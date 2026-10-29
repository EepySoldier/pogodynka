"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

type ErrorPageProps = {
    error: Error & { digest?: string },
    retry: () => void,
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 p-8 text-center">
            <TriangleAlert className="size-12 text-red-600" />
            <h1 className="text-2xl font-bold">Coś poszło nie tak</h1>
            <p className="text-gray-600">
                Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.
            </p>
            <button
                type="button"
                onClick={() => retry()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                Spróbuj ponownie
            </button>
        </main>
    );
}