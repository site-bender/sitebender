import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type MedicalTrialDesignProps from "../../../../../../types/Thing/MedicalTrialDesign/index.ts"

import MedicalEnumeration from "../index.tsx"

// MedicalTrialDesign adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalTrialDesignProps,
	"MedicalTrialDesign",
	ExtractLevelProps<MedicalTrialDesignProps, MedicalEnumerationProps>
>

export default function MedicalTrialDesign({
	schemaType = "MedicalTrialDesign",
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
