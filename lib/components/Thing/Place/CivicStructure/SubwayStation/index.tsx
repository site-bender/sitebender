import type BaseProps from "../../../../../types/index.ts"
import type SubwayStationProps from "../../../../../types/Thing/Place/CivicStructure/SubwayStation/index.ts"

import CivicStructure from "../index.tsx"

export type Props = SubwayStationProps & BaseProps

export default function SubwayStation({
	_type = "SubwayStation",
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
		>
			{children}
		</CivicStructure>
	)
}
