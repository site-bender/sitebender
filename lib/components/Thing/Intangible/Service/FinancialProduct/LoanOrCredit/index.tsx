import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../../../types/Thing/Intangible/Service/index.ts"
import type { FinancialProductProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/index.ts"
import type { LoanOrCreditProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = BaseComponentProps<
	LoanOrCreditProps,
	"LoanOrCredit",
	ExtractLevelProps<ThingProps, IntangibleProps, ServiceProps, FinancialProductProps>
>

export default function LoanOrCredit({
	amount,
	currency,
	gracePeriod,
	loanRepaymentForm,
	loanTerm,
	loanType,
	recourseLoan,
	renegotiableLoan,
	requiredCollateral,
	schemaType = "LoanOrCredit",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<FinancialProduct
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				amount,
				currency,
				gracePeriod,
				loanRepaymentForm,
				loanTerm,
				loanType,
				recourseLoan,
				renegotiableLoan,
				requiredCollateral,
				...subtypeProperties,
			}}
		/>
	)
}
