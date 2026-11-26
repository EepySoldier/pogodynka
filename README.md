# Pogodynka

Wpisujesz miasto i widzisz pogodę na teraz oraz prognozę na 5 dni.

Działa tu: https://pogodynka-two.vercel.app/

<img width="786" height="536" alt="image" src="https://github.com/user-attachments/assets/7015c4c3-9ba4-4ad3-b46b-1b9466c6bfd1" />

<img width="809" height="716" alt="image" src="https://github.com/user-attachments/assets/0c5f2888-e8e5-454c-a11a-7259a094e696" />

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

## Decyzje techniczne

- **Stan w URL-u**: po odświeżeniu nic się nie gubi i można komuś wysłać link
- **Pogodę pobierają server components**: dane pobiera serwer, więc do przeglądarki trafia mniej JS-a, a Suspense pokazuje w tym czasie szkielet ładowania
- **Timeout na fetchu**: zapytanie jest przerywane po 8 s, żeby zawieszone API nie blokowało strony w nieskończoność
- **Cache**: prognoza i tak nie zmienia się co chwilę, więc kilkuminutowe opóźnienie nie przeszkadza, a przy wielu wejściach na tę samą lokalizację nie odpytuję API za każdym razem.

  <img width="514" height="395" alt="image" src="https://github.com/user-attachments/assets/5554b6a9-631c-4813-88e6-b98b08046880" />

