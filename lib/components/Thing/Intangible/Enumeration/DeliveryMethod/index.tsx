import type BaseProps from "../../../../../types/index.ts"
import type { DeliveryMethodProps } from "../../../../../types/Thing/Intangible/Enumeration/DeliveryMethod/index.ts"

import Enumeration from "../index.tsx"

export type Props = DeliveryMethodProps & BaseProps

export default function DeliveryMethod({
	_type = "DeliveryMethod",
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
