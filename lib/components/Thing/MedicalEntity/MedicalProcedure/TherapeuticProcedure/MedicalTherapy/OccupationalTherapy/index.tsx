import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type MedicalTherapyProps from "../../../../../../../types/Thing/MedicalTherapy/index.ts"
import type OccupationalTherapyProps from "../../../../../../../types/Thing/OccupationalTherapy/index.ts"

import MedicalTherapy from "../index.tsx"

// OccupationalTherapy adds no properties to the MedicalTherapy schema type
export type Props = BaseComponentProps<
	OccupationalTherapyProps,
	"OccupationalTherapy",
	ExtractLevelProps<OccupationalTherapyProps, MedicalTherapyProps>
>

export default function OccupationalTherapy({
	schemaType = "OccupationalTherapy",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalTherapy
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
