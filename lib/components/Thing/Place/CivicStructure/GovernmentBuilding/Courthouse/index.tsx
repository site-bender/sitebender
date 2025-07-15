import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CourthouseProps from "../../../../../../types/Thing/Courthouse/index.ts"
import type GovernmentBuildingProps from "../../../../../../types/Thing/GovernmentBuilding/index.ts"

import GovernmentBuilding from "./index.tsx"

// Courthouse adds no properties to the GovernmentBuilding schema type
export type Props = BaseComponentProps<
	CourthouseProps,
	"Courthouse",
	ExtractLevelProps<CourthouseProps, GovernmentBuildingProps>
>

export default function Courthouse({
	schemaType = "Courthouse",
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
