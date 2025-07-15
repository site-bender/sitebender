import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DrugPrescriptionStatusProps from "../../../../../../types/Thing/DrugPrescriptionStatus/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"

import MedicalEnumeration from "./index.tsx"

// DrugPrescriptionStatus adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	DrugPrescriptionStatusProps,
	"DrugPrescriptionStatus",
	ExtractLevelProps<DrugPrescriptionStatusProps, MedicalEnumerationProps>
>

export default function DrugPrescriptionStatus({
	schemaType = "DrugPrescriptionStatus",
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
