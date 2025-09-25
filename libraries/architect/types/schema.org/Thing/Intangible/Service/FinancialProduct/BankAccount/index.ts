import type { Text, URL } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"
import type { DepositAccountType } from "./DepositAccount/index.ts"

import MonetaryAmountComponent from "../../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"

export type BankAccountType = "BankAccount" | DepositAccountType

export interface BankAccountProps {
	"@type"?: BankAccountType
	accountMinimumInflow?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	accountOverdraftLimit?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	bankAccountType?: Text | URL
}

type BankAccount =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& BankAccountProps

export default BankAccount
