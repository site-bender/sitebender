import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/HomeAndConstructionBusiness/index.ts"
import type RoofingContractorProps from "../../../../../../types/Thing/RoofingContractor/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

// RoofingContractor adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	RoofingContractorProps,
	"RoofingContractor",
	ExtractLevelProps<RoofingContractorProps, HomeAndConstructionBusinessProps>
>

export default function RoofingContractor({
	schemaType = "RoofingContractor",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<HomeAndConstructionBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
