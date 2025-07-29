import type BaseProps from "../../../../../types/index.ts"
import type SuiteProps from "../../../../../types/Thing/Place/Accommodation/Suite/index.ts"

import Accommodation from "../index.tsx"

export type Props = SuiteProps & BaseProps

export default function Suite({
	bed,
	numberOfRooms,
	occupancy,
	_type = "Suite",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Accommodation
			{...props}
			_type={_type}
			subtypeProperties={{
				bed,
				numberOfRooms,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
