import type BaseProps from "../../../../../types/index.ts"
import type { TheaterGroupProps } from "../../../../../types/Thing/Organization/PerformingGroup/TheaterGroup/index.ts"

import PerformingGroup from "../index.tsx"

export type Props = TheaterGroupProps & BaseProps

export default function TheaterGroup({
	_type = "TheaterGroup",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PerformingGroup
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
