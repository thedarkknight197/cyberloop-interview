import { faker } from "@faker-js/faker";
import { countries } from "countries-list";
import { Currency } from "./lib";
function generateCompanyId() {
    return `CO-${faker.string.uuid()}`;
}
const countryCodes = Object.keys(countries);
function generateCompany() {
    const countryCode = faker.helpers.arrayElement(countryCodes);
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
            currency: faker.helpers.arrayElement([
                Currency.EUR,
                Currency.USD,
            ]),
        },
    };
}
function generateCompanies(count = 5000) {
    return [...Array(count)].map(() => generateCompany());
}
const companies = generateCompanies();
console.log(companies.slice(0, 2));
