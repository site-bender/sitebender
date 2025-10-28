import type { Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ServiceProps } from "../index.ts"
import type { BankAccountType } from "./BankAccount/index.ts"
import type { CurrencyConversionServiceType } from "./CurrencyConversionService/index.ts"
import type { InvestmentOrDepositType } from "./InvestmentOrDeposit/index.ts"
import type { LoanOrCreditType } from "./LoanOrCredit/index.ts"
import type { PaymentCardType } from "./PaymentCard/index.ts"
import type { PaymentServiceType } from "./PaymentService/index.ts"

import QuantitativeValueComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type FinancialProductType =
	| "FinancialProduct"
	| LoanOrCreditType
	| PaymentCardType
	| PaymentServiceType
	| InvestmentOrDepositType
	| BankAccountType
	| CurrencyConversionServiceType

export interface FinancialProductProps {
	"@type"?: FinancialProductType
	annualPercentageRate?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	feesAndCommissionsSpecification?: Text | URL
	interestRate?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type FinancialProduct =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps

export default FinancialProduct
