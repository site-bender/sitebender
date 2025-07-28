import type BaseProps from "../../../../types/index.ts"
import type { LandformProps } from "../../../../types/Thing/Place/Landform/index.ts"

import Place from "../index.tsx"

export type Props = LandformProps & BaseProps

export default function Landform({
	_type = "Landform",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
