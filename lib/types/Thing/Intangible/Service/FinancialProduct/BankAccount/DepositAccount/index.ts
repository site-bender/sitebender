import type InvestmentOrDeposit from "../../InvestmentOrDeposit/index.ts"
import type BankAccount from "../index.ts"

// DepositAccount extends BankAccount but adds no additional properties

export default interface DepositAccount
	extends BankAccount, InvestmentOrDeposit {
}
