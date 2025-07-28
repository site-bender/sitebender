import type BaseProps from "../../../../../types/index.ts"
import type { PoliceStationProps } from "../../../../../types/Thing/Place/CivicStructure/PoliceStation/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PoliceStationProps & BaseProps

export default function PoliceStation({
	_type = "PoliceStation",
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
