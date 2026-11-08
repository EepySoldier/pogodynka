import { afterEach, describe, expect, it, vi } from "vitest";
import { formatCityName, getCityData, type City } from "@/lib/geocoding";

const warsaw: City = {
    id: 756135,
    name: "Warszawa",
    latitude: 52.23,
    longitude: 21.01,
    country_code: "PL",
    timezone: "Europe/Warsaw",
    country: "Polska",
    admin1: "Mazowieckie",
};

function mockFetch(body: unknown, status = 200) {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("getCityData", () => {
    it("returns an empty list without calling the API for a blank query", async () => {
        const fetchMock = mockFetch({});

        expect(await getCityData("")).toEqual([]);
        expect(await getCityData("   ")).toEqual([]);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("returns the cities found by the API", async () => {
        mockFetch({ results: [warsaw] });

        expect(await getCityData("Warszawa")).toEqual([warsaw]);
    });

    it("returns an empty list when the API sends no results", async () => {
        mockFetch({ generationtime_ms: 0.5 });

        expect(await getCityData("asdfgh")).toEqual([]);
    });

    it("sends the trimmed name with the expected options", async () => {
        const fetchMock = mockFetch({ results: [] });

        await getCityData("  Kraków  ");

        const params = new URL(fetchMock.mock.calls[0][0] as string).searchParams;
        expect(params.get("name")).toBe("Kraków");
        expect(params.get("count")).toBe("10");
        expect(params.get("language")).toBe("pl");
    });

    it("throws when the server responds with an error status", async () => {
        mockFetch({}, 503);

        await expect(getCityData("Warszawa")).rejects.toThrow("Geocoding server error: 503");
    });
});

describe("formatCityName", () => {
    it("joins name, region and country", () => {
        expect(formatCityName(warsaw)).toBe("Warszawa, Mazowieckie, Polska");
    });

    it("skips the parts that are missing", () => {
        expect(formatCityName({ ...warsaw, admin1: undefined })).toBe("Warszawa, Polska");
        expect(formatCityName({ ...warsaw, admin1: undefined, country: undefined })).toBe("Warszawa");
    });
});
