import type BaseProps from "../../../../../types/index.ts"
import type SizeSystemEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/SizeSystemEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = SizeSystemEnumerationProps & BaseProps

export default function SizeSystemEnumeration({
	_type = "SizeSystemEnumeration",
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
