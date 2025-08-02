import type BaseProps from "../../../../../types/index.ts"
import type SizeGroupEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/SizeGroupEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = SizeGroupEnumerationProps & BaseProps

export default function SizeGroupEnumeration({
	_type = "SizeGroupEnumeration",
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
		>
			{children}
		</Enumeration>
	)
}
