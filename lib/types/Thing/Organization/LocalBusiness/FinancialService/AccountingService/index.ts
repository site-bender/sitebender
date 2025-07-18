import type FinancialService from "../index.ts"

// AccountingService extends FinancialService but adds no additional properties

export default interface AccountingService extends FinancialService {
}
