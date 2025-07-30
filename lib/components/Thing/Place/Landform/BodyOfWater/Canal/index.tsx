import type BaseProps from "../../../../../../types/index.ts"
import type CanalProps from "../../../../../../types/Thing/Place/Landform/BodyOfWater/Canal/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = CanalProps & BaseProps

export default function Canal({
	_type = "Canal",
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
