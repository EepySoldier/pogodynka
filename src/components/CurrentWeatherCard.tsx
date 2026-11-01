import { Droplets, Wind } from "lucide-react";
import type { Weather } from "@/lib/weather";
import { describeWeatherCode } from "@/lib/weatherCodes";

type CurrentWeatherCardProps = {
    title: string,
    weather: Weather,
}

export default function CurrentWeatherCard({ title, weather }: CurrentWeatherCardProps) {
    const { current, units } = weather;
    const { label, icon: Icon } = describeWeatherCode(current.weatherCode);

    return (
        <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">{title}</h2>

            <div className="mt-4 flex items-center gap-4">
                <Icon className="size-16"/>
                <div>
                    <p className="text-5xl font-bold">
                        {Math.round(current.temperature)}
                        {units.temperature}
                    </p>
                    <p className="text-gray-600">{label}</p>
                </div>
            </div>

            <dl className="mt-6 flex gap-8 text-sm">
                <div className="flex items-center gap-2">
                    <Wind className="size-4" />
                    <dt>Prędkość Wiatru</dt>
                    <dd>
                        {current.windSpeed} {units.windSpeed}
                    </dd>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="size-4"/>
                    <dt>Wilgotność</dt>
                    <dd>{current.humidity}%</dd>
                </div>
            </dl>
        </section>
    );
}