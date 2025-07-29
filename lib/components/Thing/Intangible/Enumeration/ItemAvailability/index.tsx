import type BaseProps from "../../../../../types/index.ts"
import type ItemAvailabilityProps from "../../../../../types/Thing/Intangible/Enumeration/ItemAvailability/index.ts"

import Enumeration from "../index.tsx"

export type Props = ItemAvailabilityProps & BaseProps

export default function ItemAvailability({
	_type = "ItemAvailability",
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
