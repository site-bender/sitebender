import type BaseProps from "../../../../../types/index.ts"
import type ReturnMethodEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/ReturnMethodEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = ReturnMethodEnumerationProps & BaseProps

export default function ReturnMethodEnumeration({
	_type = "ReturnMethodEnumeration",
	children,
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
		>{children}</Enumeration>
	)
}
