import type BaseProps from "../../../../../types/index.ts"
import type StatusEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = StatusEnumerationProps & BaseProps

export default function StatusEnumeration({
	_type = "StatusEnumeration",
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
