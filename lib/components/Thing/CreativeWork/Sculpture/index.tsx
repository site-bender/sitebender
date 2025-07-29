import type BaseProps from "../../../../types/index.ts"
import type SculptureProps from "../../../../types/Thing/CreativeWork/Sculpture/index.ts"

import CreativeWork from "../index.tsx"

export type Props = SculptureProps & BaseProps

export default function Sculpture({
	_type = "Sculpture",
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
