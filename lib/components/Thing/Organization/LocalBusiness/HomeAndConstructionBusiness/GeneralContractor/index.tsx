import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GeneralContractorProps from "../../../../../../types/Thing/GeneralContractor/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/HomeAndConstructionBusiness/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

// GeneralContractor adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	GeneralContractorProps,
	"GeneralContractor",
	ExtractLevelProps<GeneralContractorProps, HomeAndConstructionBusinessProps>
>

export default function GeneralContractor({
	schemaType = "GeneralContractor",
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
