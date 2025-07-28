import type BaseProps from "../../../../../../types/index.ts"
import type { RiverBodyOfWaterProps } from "../../../../../../types/Thing/Place/Landform/BodyOfWater/RiverBodyOfWater/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = RiverBodyOfWaterProps & BaseProps

export default function RiverBodyOfWater({
	_type = "RiverBodyOfWater",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BodyOfWater
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
