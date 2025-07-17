import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DrugCostCategoryProps from "../../../../../../types/Thing/DrugCostCategory/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"

import MedicalEnumeration from "../index.tsx"

// DrugCostCategory adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	DrugCostCategoryProps,
	"DrugCostCategory",
	ExtractLevelProps<DrugCostCategoryProps, MedicalEnumerationProps>
>

export default function DrugCostCategory({
	schemaType = "DrugCostCategory",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
