import type BaseProps from "../../../../../../types/index.ts"
import type SeaBodyOfWaterProps from "../../../../../../types/Thing/Place/Landform/BodyOfWater/SeaBodyOfWater/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = SeaBodyOfWaterProps & BaseProps

export default function SeaBodyOfWater({
	_type = "SeaBodyOfWater",
	children,
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
		>{children}</BodyOfWater>
	)
}
