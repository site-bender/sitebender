import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DefenceEstablishmentProps from "../../../../../../types/Thing/DefenceEstablishment/index.ts"
import type GovernmentBuildingProps from "../../../../../../types/Thing/GovernmentBuilding/index.ts"

import GovernmentBuilding from "./index.tsx"

// DefenceEstablishment adds no properties to the GovernmentBuilding schema type
export type Props = BaseComponentProps<
	DefenceEstablishmentProps,
	"DefenceEstablishment",
	ExtractLevelProps<DefenceEstablishmentProps, GovernmentBuildingProps>
>

export default function DefenceEstablishment({
	schemaType = "DefenceEstablishment",
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
