import type BaseProps from "../../../../../../types/index.ts"
import type LegislativeBuildingProps from "../../../../../../types/Thing/Place/CivicStructure/GovernmentBuilding/LegislativeBuilding/index.ts"

import GovernmentBuilding from "../index.tsx"

export type Props = LegislativeBuildingProps & BaseProps

export default function LegislativeBuilding({
	_type = "LegislativeBuilding",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<GovernmentBuilding
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</GovernmentBuilding>
	)
}
