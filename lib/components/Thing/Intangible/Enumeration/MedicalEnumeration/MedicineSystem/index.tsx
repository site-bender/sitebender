import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type MedicineSystemProps from "../../../../../../types/Thing/MedicineSystem/index.ts"

import MedicalEnumeration from "./index.tsx"

// MedicineSystem adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicineSystemProps,
	"MedicineSystem",
	ExtractLevelProps<MedicineSystemProps, MedicalEnumerationProps>
>

export default function MedicineSystem({
	schemaType = "MedicineSystem",
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
