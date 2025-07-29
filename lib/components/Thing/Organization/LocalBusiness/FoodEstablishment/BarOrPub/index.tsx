import type BaseProps from "../../../../../../types/index.ts"
import type BarOrPubProps from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/BarOrPub/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = BarOrPubProps & BaseProps

export default function BarOrPub({
	_type = "BarOrPub",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FoodEstablishment
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
