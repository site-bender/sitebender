import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"
import type MedicalIndicationProps from "../../../../types/Thing/MedicalIndication/index.ts"

import MedicalEntity from "../index.tsx"

// MedicalIndication adds no properties to the MedicalEntity schema type
export type Props = BaseComponentProps<
	MedicalIndicationProps,
	"MedicalIndication",
	ExtractLevelProps<MedicalIndicationProps, MedicalEntityProps>
>

export default function MedicalIndication({
	schemaType = "MedicalIndication",
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
