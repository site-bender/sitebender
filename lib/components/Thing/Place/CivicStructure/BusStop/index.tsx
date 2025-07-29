import type BaseProps from "../../../../../types/index.ts"
import type BusStopProps from "../../../../../types/Thing/Place/CivicStructure/BusStop/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BusStopProps & BaseProps

export default function BusStop({
	_type = "BusStop",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
