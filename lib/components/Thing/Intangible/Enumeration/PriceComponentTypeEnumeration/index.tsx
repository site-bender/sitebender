import type BaseProps from "../../../../../types/index.ts"
import type PriceComponentTypeEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/PriceComponentTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = PriceComponentTypeEnumerationProps & BaseProps

export default function PriceComponentTypeEnumeration({
	_type = "PriceComponentTypeEnumeration",
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
