import { countries } from "countries-list";
import { z } from "zod";
const countryCodes = Object.keys(countries);
export var Currency;
(function (Currency) {
    Currency["EUR"] = "\u20AC";
    Currency["USD"] = "$";
})(Currency || (Currency = {}));
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
export const companiesSchema = z.array(companySchema);
