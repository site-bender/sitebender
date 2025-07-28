import type BaseProps from "../../../../../types/index.ts"
import type { ReturnFeesEnumerationProps } from "../../../../../types/Thing/Intangible/Enumeration/ReturnFeesEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = ReturnFeesEnumerationProps & BaseProps

export default function ReturnFeesEnumeration({
	_type = "ReturnFeesEnumeration",
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
