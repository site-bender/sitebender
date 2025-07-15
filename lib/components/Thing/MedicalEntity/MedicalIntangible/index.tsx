import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"
import type MedicalIntangibleProps from "../../../../types/Thing/MedicalIntangible/index.ts"

import MedicalEntity from "./index.tsx"

// MedicalIntangible adds no properties to the MedicalEntity schema type
export type Props = BaseComponentProps<
	MedicalIntangibleProps,
	"MedicalIntangible",
	ExtractLevelProps<MedicalIntangibleProps, MedicalEntityProps>
>

export default function MedicalIntangible({
	schemaType = "MedicalIntangible",
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
