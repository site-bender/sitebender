import type BaseProps from "../../../../../types/index.ts"
import type IncentiveQualifiedExpenseTypeProps from "../../../../../types/Thing/Intangible/Enumeration/IncentiveQualifiedExpenseType/index.ts"

import Enumeration from "../index.tsx"

export type Props = IncentiveQualifiedExpenseTypeProps & BaseProps

export default function IncentiveQualifiedExpenseType({
	_type = "IncentiveQualifiedExpenseType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
