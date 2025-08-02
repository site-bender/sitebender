import type BaseProps from "../../../../../../types/index.ts"
import type WaterfallProps from "../../../../../../types/Thing/Place/Landform/BodyOfWater/Waterfall/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = WaterfallProps & BaseProps

export default function Waterfall({
	_type = "Waterfall",
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
