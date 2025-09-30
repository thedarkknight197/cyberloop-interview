import { faker } from "@faker-js/faker"
import { countries } from "countries-list"
import {companiesSchema, Company, Currency} from "./lib";

const countryCodes = Object.keys(countries) as [string, ...string[]]

function generateCompanyId() {
    return `CO-${faker.string.uuid()}`
}

function generateCompany(): Company {
    const countryCode = faker.helpers.arrayElement(countryCodes)
    return {
        companyId: generateCompanyId(),
        name: faker.company.name(),
        legalName: `${faker.company.name()} SRL`,
        registeredOffice: faker.location.city(),
        foundationDate: faker.date.past({ years: 50 }),
        vat: {
            country: countryCode,
            value: faker.finance.accountNumber(11),
        },
        industry: {
            sectorName: faker.commerce.department(),
            sectorCode: faker.number.int({ min: 1000, max: 9999 }),
            industryGroupName: faker.commerce.productAdjective(),
            industryGroupCode: faker.number.int({ min: 1000, max: 9999 }),
        },
        website: faker.internet.url(),
        country: countryCode,
        employeeCount: faker.number.int({ min: 1, max: 5000 }),
        revenue: {
            millions: faker.number.int({ min: 1, max: 1000 }),
            currency: faker.helpers.arrayElement<Currency>([
                Currency.EUR,
                Currency.USD,
            ]),
        },
    }
}

function generateCompanies(count = 5000): Company[] {
    return [...Array(count)].map(() => generateCompany())
}

const companies = generateCompanies()
console.log(`Companies registered: ${companies.length}`)
console.dir(companies)

try {
    companiesSchema.parse(companies)
    console.log(`✅ Companies registered: ${companies.length}`)
} catch (err) {
    console.error("❌ Validation failed:", err)
}
