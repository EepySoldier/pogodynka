# Pogodynka

Wpisujesz miasto i widzisz pogodę na teraz oraz prognozę na 5 dni. Zrobiona na Next.js i TypeScripcie, głównie żeby się go nauczyć.

Działa tu: https://pogodynka-two.vercel.app/

<!-- TODO: screeny -->

## Co potrafi

- szuka po nazwie miasta, a jak pasuje kilka miejsc (np. Warszawa w Polsce i w Ohio), daje wybrać
- "Użyj mojej lokalizacji"
- przełącznik °C / °F
- szkielet ładowania, obsługa błędów, własne 404
- parę testów w Vitest

Dane z [Open-Meteo](https://open-meteo.com/), darmowe i bez klucza API.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Vitest, Vercel.

## Odpalenie

```bash
git clone https://github.com/EepySoldier/pogodynka.git
cd pogodynka
npm install
npm run dev
```

Testy: `npm test`.

Stan wyszukiwania siedzi w URL-u (`/?city=Warszawa&units=imperial`), więc po odświeżeniu nic się nie gubi i można komuś wysłać link.
