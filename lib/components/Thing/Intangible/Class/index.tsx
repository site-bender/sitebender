import type BaseProps from "../../../../types/index.ts"
import type { ClassProps } from "../../../../types/Thing/Intangible/Class/index.ts"

import Intangible from "../index.tsx"

export type Props = ClassProps & BaseProps

export default function Class({
	supersededBy,
	_type = "Class",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				supersededBy,
				...subtypeProperties,
			}}
		/>
	)
}
