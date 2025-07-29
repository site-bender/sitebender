import type BaseProps from "../../../../../types/index.ts"
import type MountainProps from "../../../../../types/Thing/Place/Landform/Mountain/index.ts"

import Landform from "../index.tsx"

export type Props = MountainProps & BaseProps

export default function Mountain({
	_type = "Mountain",
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
