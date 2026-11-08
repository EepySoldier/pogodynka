import { describe, expect, it } from "vitest";
import { buildHref } from "@/lib/urls";

describe("buildHref", () => {
    it("returns the root path when there are no params", () => {
        expect(buildHref({})).toBe("/");
    });

    it("builds a city search link", () => {
        expect(buildHref({ city: "Warszawa" })).toBe("/?city=Warszawa");
    });

    it("encodes special characters in the city name", () => {
        const href = buildHref({ city: "New York" });
        expect(new URL(href, "http://localhost").searchParams.get("city")).toBe("New York");
        expect(href).not.toContain(" ");
    });

    it("includes the selected city id", () => {
        expect(buildHref({ city: "Springfield", id: 42 })).toBe("/?city=Springfield&id=42");
    });

    it("rounds coordinates to two decimal places", () => {
        expect(buildHref({ lat: 52.23456, lon: 21.01234 })).toBe("/?lat=52.23&lon=21.01");
    });

    it("ignores coordinates when only one of them is given", () => {
        expect(buildHref({ lat: 52.23 })).toBe("/");
    });

    it("adds imperial units but omits the default metric ones", () => {
        expect(buildHref({ city: "Warszawa", units: "imperial" })).toBe("/?city=Warszawa&units=imperial");
        expect(buildHref({ city: "Warszawa", units: "metric" })).toBe("/?city=Warszawa");
    });
});
