# Readme.md Interview Cyberloop
___

## Esercizio 1 Implementazione Web App
Implementare un prototipo di TODO List Web App utilizzando lo stack tecnologico nextjs, shadcn/ui, jotai.
È sufficiente implementare un’unica pagina, poiché la valutazione non dipenderà dalla completezza dell’applicativo ma dalla qualità della pagina/funzionalità implementata.

## Esercizio 2 Refactoring Web App
Partire dal risultato dell’Esercizio 1, farne una copia, e rifattorizzare il codice.
Portarlo ad un pattern mono-repo tramite lo strumento turborepo, spostando i componenti riusabili all’interno di un nuovo package dedicato.
L’obiettivo è migliorarne: ordine, chiarezza, riusabilità, manutenibilità, immediatezza, resilienza ad errori.

## Esercizio 3 Generazione di dati di test
Considerare la struttura dati seguente, relativa ai dati salvati per un’azienda, incluso il relativo personale, generare dei dati di test con almeno 5000 entry.

```
import { countries } from "countries-list";
import { z } from "zod";

const countryCodes = Object.keys(countries) as [string, ...string[]];

export enum Currency {
 EUR = "€",
 USD = "$",
}
export const currencySchema = z.nativeEnum(Currency);

export const companyIdSchema = z.string().regex(/^CO-[a-zA-Z0-9-]{36}$/);
export const mainCompanyIdSchema = companyIdSchema;
export const enabledCompanyIdsSchema = z.array(companyIdSchema);

const companyNameSchema = z.string().min(1).max(100);
const companyLegalNameSchema = z.string().min(1).max(100);
const companyVATSchema = z.object({
 country: z.enum(countryCodes),
 value: z.string().min(1),
});
const companyWebsiteSchema = z.string().url();
export const companySchema = z.object({
 companyId: companyIdSchema,
 name: companyNameSchema,
 legalName: companyLegalNameSchema,
 registeredOffice: z.string().min(1).max(100),
 foundationDate: z.coerce.date(),
 vat: companyVATSchema,
 industry: z.object({
  sectorName: z.string(),
  sectorCode: z.number().optional(),
  industryGroupName: z.string().optional(),
  industryGroupCode: z.number().optional(),
 }),
 website: companyWebsiteSchema,
 country: z.enum(countryCodes),
 employeeCount: z.number().min(0),
 revenue: z.object({
  millions: z.number(),
  currency: currencySchema,
 }),
});
export type Company = z.input<typeof companySchema>;

export const companiesSchema = z.array(companySchema);
```
