import type BaseProps from "../../../../../../types/index.ts"
import type InsuranceAgencyProps from "../../../../../../types/Thing/Organization/LocalBusiness/FinancialService/InsuranceAgency/index.ts"

import FinancialService from "../index.tsx"

export type Props = InsuranceAgencyProps & BaseProps

export default function InsuranceAgency({
	_type = "InsuranceAgency",
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
