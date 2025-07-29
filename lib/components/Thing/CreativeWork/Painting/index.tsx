import type BaseProps from "../../../../types/index.ts"
import type PaintingProps from "../../../../types/Thing/CreativeWork/Painting/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PaintingProps & BaseProps

export default function Painting({
	_type = "Painting",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
