import type BaseProps from "../../../../../types/index.ts"
import type { BodyOfWaterProps } from "../../../../../types/Thing/Place/Landform/BodyOfWater/index.ts"

import Landform from "../index.tsx"

export type Props = BodyOfWaterProps & BaseProps

export default function BodyOfWater({
	_type = "BodyOfWater",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Landform
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
