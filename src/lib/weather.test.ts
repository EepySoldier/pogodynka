import { afterEach, describe, expect, it, vi } from "vitest";
import { getWeather } from "@/lib/weather";

const forecastResponse = {
    current: {
        time: "2026-11-05T12:00",
        temperature_2m: 7.4,
        relative_humidity_2m: 81,
        wind_speed_10m: 12.5,
        weather_code: 63,
    },
    current_units: {
        temperature_2m: "°C",
        wind_speed_10m: "km/h",
    },
    daily: {
        time: ["2026-11-05", "2026-11-06"],
        weather_code: [63, 3],
        temperature_2m_max: [9.1, 8.0],
        temperature_2m_min: [3.2, 2.5],
    },
};

function mockFetch(body: unknown, status = 200) {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
}

function requestedUrl(fetchMock: ReturnType<typeof mockFetch>): URL {
    return new URL(fetchMock.mock.calls[0][0] as string);
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("getWeather", () => {
    it("maps the API response to the Weather shape", async () => {
        mockFetch(forecastResponse);

        const weather = await getWeather(52.23, 21.01);

        expect(weather.current).toEqual({
            time: "2026-11-05T12:00",
            temperature: 7.4,
            humidity: 81,
            windSpeed: 12.5,
            weatherCode: 63,
        });
        expect(weather.units).toEqual({ temperature: "°C", windSpeed: "km/h" });
    });

    it("turns parallel daily arrays into a list of day objects", async () => {
        mockFetch(forecastResponse);

        const { daily } = await getWeather(52.23, 21.01);

        expect(daily).toEqual([
            { date: "2026-11-05", weatherCode: 63, tempMax: 9.1, tempMin: 3.2 },
            { date: "2026-11-06", weatherCode: 3, tempMax: 8.0, tempMin: 2.5 },
        ]);
    });

    it("requests metric units, auto timezone and 5 days by default", async () => {
        const fetchMock = mockFetch(forecastResponse);

        await getWeather(52.23, 21.01);

        const params = requestedUrl(fetchMock).searchParams;
        expect(params.get("latitude")).toBe("52.23");
        expect(params.get("longitude")).toBe("21.01");
        expect(params.get("temperature_unit")).toBe("celsius");
        expect(params.get("wind_speed_unit")).toBe("kmh");
        expect(params.get("timezone")).toBe("auto");
        expect(params.get("forecast_days")).toBe("5");
    });

    it("requests imperial units when asked", async () => {
        const fetchMock = mockFetch(forecastResponse);

        await getWeather(52.23, 21.01, "imperial");

        const params = requestedUrl(fetchMock).searchParams;
        expect(params.get("temperature_unit")).toBe("fahrenheit");
        expect(params.get("wind_speed_unit")).toBe("mph");
    });

    it("requests the given number of forecast days", async () => {
        const fetchMock = mockFetch(forecastResponse);

        await getWeather(52.23, 21.01, "metric", 3);

        expect(requestedUrl(fetchMock).searchParams.get("forecast_days")).toBe("3");
    });

    it("throws when the server responds with an error status", async () => {
        mockFetch({}, 500);

        await expect(getWeather(52.23, 21.01)).rejects.toThrow("Weather server error: 500");
    });
});
