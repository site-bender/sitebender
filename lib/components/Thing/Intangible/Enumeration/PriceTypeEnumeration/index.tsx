import type BaseProps from "../../../../../types/index.ts"
import type { PriceTypeEnumerationProps } from "../../../../../types/Thing/Intangible/Enumeration/PriceTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = PriceTypeEnumerationProps & BaseProps

export default function PriceTypeEnumeration({
	_type = "PriceTypeEnumeration",
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
