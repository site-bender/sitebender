import type BaseProps from "../../../../../../types/index.ts"
import type BankOrCreditUnionProps from "../../../../../../types/Thing/Organization/LocalBusiness/FinancialService/BankOrCreditUnion/index.ts"

import FinancialService from "../index.tsx"

export type Props = BankOrCreditUnionProps & BaseProps

export default function BankOrCreditUnion({
	_type = "BankOrCreditUnion",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FinancialService
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</FinancialService>
	)
}
