import type BaseProps from "../../../../../../types/index.ts"
import type BreweryProps from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/Brewery/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = BreweryProps & BaseProps

export default function Brewery({
	_type = "Brewery",
	children,
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
		>
			{children}
		</FoodEstablishment>
	)
}
