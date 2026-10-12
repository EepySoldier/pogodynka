import { getCityData } from "@/lib/geocoding";
import { getWeather } from "@/lib/weather";
import { describeWeatherCode } from "@/lib/weatherCodes";

export default async function Home() {
  const cities = await getCityData("Warszawa");
  const city = cities[0];
  const weather = city ? await getWeather(city.latitude, city.longitude) : null;
  const info = weather ? describeWeatherCode(weather.current.weatherCode) : null;

  return (
      <main className="p-8">
        <h1 className="text-2xl">Pogodynka</h1>
        {info && <info.icon className="size-10"/>}
        <pre>{JSON.stringify({ city, weather, info: info?.label }, null, 2)}</pre>
      </main>
  );
}