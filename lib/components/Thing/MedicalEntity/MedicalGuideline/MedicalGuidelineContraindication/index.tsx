import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalGuidelineProps from "../../../../../types/Thing/MedicalGuideline/index.ts"
import type MedicalGuidelineContraindicationProps from "../../../../../types/Thing/MedicalGuidelineContraindication/index.ts"

import MedicalGuideline from "../index.tsx"

// MedicalGuidelineContraindication adds no properties to the MedicalGuideline schema type
export type Props = BaseComponentProps<
	MedicalGuidelineContraindicationProps,
	"MedicalGuidelineContraindication",
	ExtractLevelProps<
		MedicalGuidelineContraindicationProps,
		MedicalGuidelineProps
	>
>

export default function MedicalGuidelineContraindication({
	schemaType = "MedicalGuidelineContraindication",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalGuideline
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
