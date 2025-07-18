import type FinancialService from "../index.ts"

// InsuranceAgency extends FinancialService but adds no additional properties

export default interface InsuranceAgency extends FinancialService {
}
