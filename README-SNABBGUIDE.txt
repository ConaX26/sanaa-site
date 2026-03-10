SANAA SITE V1 – SNABBGUIDE

1. Packa upp zip-filen till en egen mapp, t.ex.:
   C:\Projekt\sanaa-site-v1

2. Öppna PowerShell i mappen.

3. Kör exakt detta:
   npm install

4. När installationen är klar, kör:
   npm run dev

5. Öppna sedan:
   http://localhost:3000

VIKTIGT ATT BYTA INNAN PUBLICERING
- src/lib/site.ts
  Lägg in riktig telefon och e-post.
- public/projects/
  Byt platshållar-bilderna mot riktiga projektbilder.
- public/sanaa-logo.png
  Byt filen om du senare får en skarpare logotyp/export.

VANLIGA KOMMANDON
- Starta lokalt:
  npm run dev

- Bygga för kontroll:
  npm run build

- Starta produktionsläge efter build:
  npm run start

REKOMMENDERAD FÖRSTA UPPDATERING
1. Lägg in kontaktuppgifter i src/lib/site.ts
2. Lägg in minst 3 riktiga bilder i public/projects/
3. Byt gärna hero-bilden/loggan till skarpare original senare
