import type BaseProps from "../../../../../../types/index.ts"
import type LakeBodyOfWaterProps from "../../../../../../types/Thing/Place/Landform/BodyOfWater/LakeBodyOfWater/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = LakeBodyOfWaterProps & BaseProps

export default function LakeBodyOfWater({
	_type = "LakeBodyOfWater",
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
