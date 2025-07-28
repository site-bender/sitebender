import type BaseProps from "../../../../../../types/index.ts"
import type { DistilleryProps } from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/Distillery/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = DistilleryProps & BaseProps

export default function Distillery({
	_type = "Distillery",
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
