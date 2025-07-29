import type BaseProps from "../../../../../types/index.ts"
import type VolcanoProps from "../../../../../types/Thing/Place/Landform/Volcano/index.ts"

import Landform from "../index.tsx"

export type Props = VolcanoProps & BaseProps

export default function Volcano({
	_type = "Volcano",
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
