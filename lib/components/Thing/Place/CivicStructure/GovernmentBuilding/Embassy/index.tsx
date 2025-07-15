import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EmbassyProps from "../../../../../../types/Thing/Embassy/index.ts"
import type GovernmentBuildingProps from "../../../../../../types/Thing/GovernmentBuilding/index.ts"

import GovernmentBuilding from "./index.tsx"

// Embassy adds no properties to the GovernmentBuilding schema type
export type Props = BaseComponentProps<
	EmbassyProps,
	"Embassy",
	ExtractLevelProps<EmbassyProps, GovernmentBuildingProps>
>

export default function Embassy({
	schemaType = "Embassy",
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
