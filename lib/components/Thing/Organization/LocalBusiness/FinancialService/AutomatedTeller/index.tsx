import type BaseProps from "../../../../../../types/index.ts"
import type AutomatedTellerProps from "../../../../../../types/Thing/Organization/LocalBusiness/FinancialService/AutomatedTeller/index.ts"

import FinancialService from "../index.tsx"

export type Props = AutomatedTellerProps & BaseProps

export default function AutomatedTeller({
	_type = "AutomatedTeller",
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
		/>
	)
}
