import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalContraindicationProps from "../../../../types/Thing/MedicalContraindication/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"

import MedicalEntity from "../index.tsx"

// MedicalContraindication adds no properties to the MedicalEntity schema type
export type Props = BaseComponentProps<
	MedicalContraindicationProps,
	"MedicalContraindication",
	ExtractLevelProps<MedicalContraindicationProps, MedicalEntityProps>
>

export default function MedicalContraindication({
	schemaType = "MedicalContraindication",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
