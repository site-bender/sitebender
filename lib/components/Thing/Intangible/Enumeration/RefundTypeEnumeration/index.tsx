import type BaseProps from "../../../../../types/index.ts"
import type RefundTypeEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/RefundTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = RefundTypeEnumerationProps & BaseProps

export default function RefundTypeEnumeration({
	_type = "RefundTypeEnumeration",
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
