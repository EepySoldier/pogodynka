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
    0: { label: "Clear sky", icon: Sun },
    1: { label: "Mainly clear", icon: Sun },
    2: { label: "Partly cloudy", icon: CloudSun },
    3: { label: "Overcast", icon: Cloud },
    45: { label: "Fog", icon: CloudFog },
    48: { label: "Rime fog", icon: CloudFog },
    51: { label: "Light drizzle", icon: CloudDrizzle },
    53: { label: "Drizzle", icon: CloudDrizzle },
    55: { label: "Heavy drizzle", icon: CloudDrizzle },
    56: { label: "Freezing drizzle", icon: CloudDrizzle },
    57: { label: "Heavy freezing drizzle", icon: CloudDrizzle },
    61: { label: "Light rain", icon: CloudRain },
    63: { label: "Rain", icon: CloudRain },
    65: { label: "Heavy rain", icon: CloudRainWind },
    66: { label: "Freezing rain", icon: CloudRain },
    67: { label: "Heavy freezing rain", icon: CloudRainWind },
    71: { label: "Light snow", icon: CloudSnow },
    73: { label: "Snow", icon: CloudSnow },
    75: { label: "Heavy snow", icon: Snowflake },
    77: { label: "Snow grains", icon: Snowflake },
    80: { label: "Rain showers", icon: CloudRain },
    81: { label: "Heavy rain showers", icon: CloudRainWind },
    82: { label: "Violent rain showers", icon: CloudRainWind },
    85: { label: "Snow showers", icon: CloudSnow },
    86: { label: "Heavy snow showers", icon: Snowflake },
    95: { label: "Thunderstorm", icon: CloudLightning },
    96: { label: "Thunderstorm with hail", icon: CloudHail },
    97: { label: "Heavy thunderstorm", icon: CloudLightning },
    99: { label: "Severe thunderstorm with hail", icon: CloudHail },
}

export function describeWeatherCode(code: number): WeatherInfo {
    return WEATHER_CODES[code] ?? { label: "Unknown", icon: CircleQuestionMark };
}