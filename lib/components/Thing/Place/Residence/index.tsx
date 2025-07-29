import type BaseProps from "../../../../types/index.ts"
import type ResidenceProps from "../../../../types/Thing/Place/Residence/index.ts"

import Place from "../index.tsx"

export type Props = ResidenceProps & BaseProps

export default function Residence({
	accommodationFloorPlan,
	_type = "Residence",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				accommodationFloorPlan,
				...subtypeProperties,
			}}
		/>
	)
}
