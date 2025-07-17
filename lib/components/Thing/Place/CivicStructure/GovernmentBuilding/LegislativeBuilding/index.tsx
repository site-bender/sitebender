import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GovernmentBuildingProps from "../../../../../../types/Thing/GovernmentBuilding/index.ts"
import type LegislativeBuildingProps from "../../../../../../types/Thing/LegislativeBuilding/index.ts"

import GovernmentBuilding from "../index.tsx"

// LegislativeBuilding adds no properties to the GovernmentBuilding schema type
export type Props = BaseComponentProps<
	LegislativeBuildingProps,
	"LegislativeBuilding",
	ExtractLevelProps<LegislativeBuildingProps, GovernmentBuildingProps>
>

export default function LegislativeBuilding({
	schemaType = "LegislativeBuilding",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<GovernmentBuilding
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
