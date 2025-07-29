import type BaseProps from "../../../../../types/index.ts"
import type ContinentProps from "../../../../../types/Thing/Place/Landform/Continent/index.ts"

import Landform from "../index.tsx"

export type Props = ContinentProps & BaseProps

export default function Continent({
	_type = "Continent",
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
