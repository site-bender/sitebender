import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type PhysicalExamProps from "../../../../../../types/Thing/PhysicalExam/index.ts"

import MedicalEnumeration from "./index.tsx"

// PhysicalExam adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	PhysicalExamProps,
	"PhysicalExam",
	ExtractLevelProps<PhysicalExamProps, MedicalEnumerationProps>
>

export default function PhysicalExam({
	schemaType = "PhysicalExam",
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
