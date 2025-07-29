import type BaseProps from "../../../../../../types/index.ts"
import type PondProps from "../../../../../../types/Thing/Place/Landform/BodyOfWater/Pond/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = PondProps & BaseProps

export default function Pond({
	_type = "Pond",
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
