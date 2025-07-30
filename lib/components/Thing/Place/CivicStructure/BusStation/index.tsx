import type BaseProps from "../../../../../types/index.ts"
import type BusStationProps from "../../../../../types/Thing/Place/CivicStructure/BusStation/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BusStationProps & BaseProps

export default function BusStation({
	_type = "BusStation",
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
