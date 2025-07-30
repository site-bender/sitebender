import type BaseProps from "../../../../../types/index.ts"
import type GovernmentBuildingProps from "../../../../../types/Thing/Place/CivicStructure/GovernmentBuilding/index.ts"

import CivicStructure from "../index.tsx"

export type Props = GovernmentBuildingProps & BaseProps

export default function GovernmentBuilding({
	_type = "GovernmentBuilding",
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
