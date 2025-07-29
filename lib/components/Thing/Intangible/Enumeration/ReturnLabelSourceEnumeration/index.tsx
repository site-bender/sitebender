import type BaseProps from "../../../../../types/index.ts"
import type ReturnLabelSourceEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/ReturnLabelSourceEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = ReturnLabelSourceEnumerationProps & BaseProps

export default function ReturnLabelSourceEnumeration({
	_type = "ReturnLabelSourceEnumeration",
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
