import {
    CircleQuestionMark,
    Cloud,
    CloudDrizzle,
    CloudFog,
    CloudHail,
    CloudLightning,
    CloudRain,
    CloudRainWind,
    CloudSnow,
    CloudSun,
    Snowflake,
    Sun,
    type LucideIcon,
} from "lucide-react";

type WeatherInfo = {
    label: string,
    icon: LucideIcon,
}

const WEATHER_CODES: Record<number, WeatherInfo> = {
    0: { label: "Bezchmurnie", icon: Sun },
    1: { label: "Przeważnie bezchmurnie", icon: Sun },
    2: { label: "Częściowe zachmurzenie", icon: CloudSun },
    3: { label: "Pochmurno", icon: Cloud },
    45: { label: "Mgła", icon: CloudFog },
    48: { label: "Mgła szronowa", icon: CloudFog },
    51: { label: "Lekka mżawka", icon: CloudDrizzle },
    53: { label: "Mżawka", icon: CloudDrizzle },
    55: { label: "Silna mżawka", icon: CloudDrizzle },
    56: { label: "Marznąca mżawka", icon: CloudDrizzle },
    57: { label: "Silna marznąca mżawka", icon: CloudDrizzle },
    61: { label: "Lekki deszcz", icon: CloudRain },
    63: { label: "Deszcz", icon: CloudRain },
    65: { label: "Silny deszcz", icon: CloudRainWind },
    66: { label: "Marznący deszcz", icon: CloudRain },
    67: { label: "Silny marznący deszcz", icon: CloudRainWind },
    71: { label: "Lekki śnieg", icon: CloudSnow },
    73: { label: "Śnieg", icon: CloudSnow },
    75: { label: "Silny śnieg", icon: Snowflake },
    77: { label: "Ziarna śniegu", icon: Snowflake },
    80: { label: "Przelotny deszcz", icon: CloudRain },
    81: { label: "Silny przelotny deszcz", icon: CloudRainWind },
    82: { label: "Gwałtowna ulewa", icon: CloudRainWind },
    85: { label: "Przelotny śnieg", icon: CloudSnow },
    86: { label: "Silny przelotny śnieg", icon: Snowflake },
    95: { label: "Burza", icon: CloudLightning },
    96: { label: "Burza z gradem", icon: CloudHail },
    97: { label: "Silna burza", icon: CloudLightning },
    99: { label: "Silna burza z gradem", icon: CloudHail },
}

export function describeWeatherCode(code: number): WeatherInfo {
    return WEATHER_CODES[code] ?? { label: "Nieznana pogoda", icon: CircleQuestionMark };
}