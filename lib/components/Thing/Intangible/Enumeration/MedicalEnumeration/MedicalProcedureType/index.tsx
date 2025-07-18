import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type MedicalProcedureTypeProps from "../../../../../../types/Thing/MedicalProcedureType/index.ts"

import MedicalEnumeration from "../index.tsx"

// MedicalProcedureType adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	MedicalProcedureTypeProps,
	"MedicalProcedureType",
	ExtractLevelProps<MedicalProcedureTypeProps, MedicalEnumerationProps>
>

export default function MedicalProcedureType({
	schemaType = "MedicalProcedureType",
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
