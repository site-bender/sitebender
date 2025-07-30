import type BaseProps from "../../../../../types/index.ts"
import type TrainStationProps from "../../../../../types/Thing/Place/CivicStructure/TrainStation/index.ts"

import CivicStructure from "../index.tsx"

export type Props = TrainStationProps & BaseProps

export default function TrainStation({
	_type = "TrainStation",
	children,
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
		>{children}</CivicStructure>
	)
}
