export default function WeatherSkeleton() {
    return (
        <div
            role="status"
            aria-label="Ładowanie pogody"
            className="mt-6 flex animate-pulse flex-col gap-6"
        >
            <div className="h-48 rounded-2xl bg-gray-200" />
            <div>
                <div className="mb-3 h-6 w-40 rounded bg-gray-200" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="h-40 rounded-xl bg-gray-200" />
                    ))}
                </div>
            </div>
        </div>
    );
}