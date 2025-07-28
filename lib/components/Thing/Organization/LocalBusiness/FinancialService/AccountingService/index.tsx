import type BaseProps from "../../../../../../types/index.ts"
import type { AccountingServiceProps } from "../../../../../../types/Thing/Organization/LocalBusiness/FinancialService/AccountingService/index.ts"

import FinancialService from "../index.tsx"

export type Props = AccountingServiceProps & BaseProps

export default function AccountingService({
	_type = "AccountingService",
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
