import type BaseProps from "../../../../../types/index.ts"
import type FoodServiceProps from "../../../../../types/Thing/Intangible/Service/FoodService/index.ts"

import Service from "../index.tsx"

export type Props = FoodServiceProps & BaseProps

export default function FoodService({
	_type = "FoodService",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
