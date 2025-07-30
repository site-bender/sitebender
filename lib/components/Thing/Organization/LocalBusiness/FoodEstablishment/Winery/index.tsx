import type BaseProps from "../../../../../../types/index.ts"
import type WineryProps from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/Winery/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = WineryProps & BaseProps

export default function Winery({
	_type = "Winery",
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
		>{children}</FoodEstablishment>
	)
}
