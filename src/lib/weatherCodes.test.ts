import { Cloud, CircleQuestionMark, Sun } from "lucide-react";
import { describe, expect, it } from "vitest";
import { describeWeatherCode } from "@/lib/weatherCodes";

describe("describeWeatherCode", () => {
    it("maps a known code to a label and an icon", () => {
        expect(describeWeatherCode(0)).toEqual({ label: "Bezchmurnie", icon: Sun });
        expect(describeWeatherCode(3)).toEqual({ label: "Pochmurno", icon: Cloud });
    });

    it("falls back to an unknown label for codes missing from the table", () => {
        expect(describeWeatherCode(1234)).toEqual({ label: "Nieznana pogoda", icon: CircleQuestionMark });
        expect(describeWeatherCode(-1).label).toBe("Nieznana pogoda");
    });
});
