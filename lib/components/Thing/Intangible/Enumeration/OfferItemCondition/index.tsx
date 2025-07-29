import type BaseProps from "../../../../../types/index.ts"
import type OfferItemConditionProps from "../../../../../types/Thing/Intangible/Enumeration/OfferItemCondition/index.ts"

import Enumeration from "../index.tsx"

export type Props = OfferItemConditionProps & BaseProps

export default function OfferItemCondition({
	_type = "OfferItemCondition",
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
