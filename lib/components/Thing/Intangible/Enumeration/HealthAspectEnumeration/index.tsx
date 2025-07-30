import type BaseProps from "../../../../../types/index.ts"
import type HealthAspectEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/HealthAspectEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = HealthAspectEnumerationProps & BaseProps

export default function HealthAspectEnumeration({
	_type = "HealthAspectEnumeration",
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
