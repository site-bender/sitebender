import type BaseProps from "../../../../../../types/index.ts"
import type { BakeryProps } from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/Bakery/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = BakeryProps & BaseProps

export default function Bakery({
	_type = "Bakery",
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
