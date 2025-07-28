import type BaseProps from "../../../../../types/index.ts"
import type { FulfillmentTypeEnumerationProps } from "../../../../../types/Thing/Intangible/Enumeration/FulfillmentTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = FulfillmentTypeEnumerationProps & BaseProps

export default function FulfillmentTypeEnumeration({
	_type = "FulfillmentTypeEnumeration",
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
