import type BaseProps from "../../../../../../types/index.ts"
import type { ReservoirProps } from "../../../../../../types/Thing/Place/Landform/BodyOfWater/Reservoir/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = ReservoirProps & BaseProps

export default function Reservoir({
	_type = "Reservoir",
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
