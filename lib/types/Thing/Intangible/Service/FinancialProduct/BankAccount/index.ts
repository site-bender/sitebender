import type { Text, URL } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"

export interface BankAccountProps {
	accountMinimumInflow?: MonetaryAmount
	accountOverdraftLimit?: MonetaryAmount
	bankAccountType?: Text | URL
}

type BankAccount =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& BankAccountProps

export default BankAccount
