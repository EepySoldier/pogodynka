import type { DailyForecast } from "@/lib/weather";
import { describeWeatherCode } from "@/lib/weatherCodes";

type ForecastListProps = {
  daily: DailyForecast[];
  unit: string;
};

function formatDay(date: string, index: number): string {
  if (index === 0) return "Dzisiaj";
  return new Date(date).toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export default function ForecastList({ daily, unit }: ForecastListProps) {
  return (
    <section aria-labelledby="forecast-title">
      <h2 id="forecast-title" className="mb-3 text-lg font-semibold">
        Prognoza Pogody
      </h2>
      <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {daily.map((day, index) => {
          const { label, icon: Icon } = describeWeatherCode(day.weatherCode);
          return (
            <li
              key={day.date}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 text-center"
            >
              <p className="text-sm font-medium">
                <time dateTime={day.date}>{formatDay(day.date, index)}</time>
              </p>
              <Icon className="size-8" />
              <p className="text-xs text-gray-600">{label}</p>
              <p className="text-sm">
                <span className="sr-only">Maksymalnie </span>
                <span className="font-semibold">
                  {Math.round(day.tempMax)}
                  {unit}
                </span>
                <span aria-hidden="true">{" / "}</span>
                <span className="sr-only">, minimalnie </span>
                <span className="text-gray-600">
                  {Math.round(day.tempMin)}
                  {unit}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
