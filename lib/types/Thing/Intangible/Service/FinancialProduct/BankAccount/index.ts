import type { Text, URL } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"

export interface BankAccountProps {
	/** A minimum amount that has to be paid in every month. */
	accountMinimumInflow?: MonetaryAmount
	/** An overdraft is an extension of credit from a lending institution when an account reaches zero. An overdraft allows the individual to continue withdrawing money even if the account has no funds in it. Basically the bank allows people to borrow a set amount of money. */
	accountOverdraftLimit?: MonetaryAmount
	/** The type of a bank account. */
	bankAccountType?: Text | URL
}

type BankAccount =
	& Thing
	& FinancialProductProps
	& IntangibleProps
	& ServiceProps
	& BankAccountProps

export default BankAccount
