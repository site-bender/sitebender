import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type GovernmentBuildingProps from "../../../../../types/Thing/GovernmentBuilding/index.ts"

import CivicStructure from "./index.tsx"

// GovernmentBuilding adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	GovernmentBuildingProps,
	"GovernmentBuilding",
	ExtractLevelProps<GovernmentBuildingProps, CivicStructureProps>
>

export default function GovernmentBuilding({
	schemaType = "GovernmentBuilding",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
