import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../../types/index.ts"
import type ThingProps from "../../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../../../../types/Thing/Intangible/Service/index.ts"
import type { FinancialProductProps } from "../../../../../../../types/Thing/Intangible/Service/FinancialProduct/index.ts"
import type { LoanOrCreditProps } from "../../../../../../../types/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"
import type { MortgageLoanProps } from "../../../../../../../types/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/MortgageLoan/index.ts"

import LoanOrCredit from "../index.tsx"

export type Props = BaseComponentProps<
	MortgageLoanProps,
	"MortgageLoan",
	ExtractLevelProps<ThingProps, IntangibleProps, ServiceProps, FinancialProductProps, LoanOrCreditProps>
>

export default function MortgageLoan({
	domiciledMortgage,
	loanMortgageMandateAmount,
	schemaType = "MortgageLoan",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<LoanOrCredit
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				domiciledMortgage,
				loanMortgageMandateAmount,
				...subtypeProperties,
			}}
		/>
	)
}
