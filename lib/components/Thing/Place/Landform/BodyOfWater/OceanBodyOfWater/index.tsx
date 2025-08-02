import type BaseProps from "../../../../../../types/index.ts"
import type OceanBodyOfWaterProps from "../../../../../../types/Thing/Place/Landform/BodyOfWater/OceanBodyOfWater/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = OceanBodyOfWaterProps & BaseProps

export default function OceanBodyOfWater({
	_type = "OceanBodyOfWater",
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
		>
			{children}
		</BodyOfWater>
	)
}
