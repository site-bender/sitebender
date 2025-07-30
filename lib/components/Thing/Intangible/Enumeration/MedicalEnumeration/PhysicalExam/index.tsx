import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"
import type PhysicalExamProps from "../../../../../../types/Thing/PhysicalExam/index.ts"

import MedicalEnumeration from "../index.tsx"

// PhysicalExam adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	PhysicalExamProps,
	"PhysicalExam",
	ExtractLevelProps<PhysicalExamProps, MedicalEnumerationProps>
>

export default function PhysicalExam({
	_type = "PhysicalExam",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalEnumeration
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>{children}</PhysicalExamProps>
	)
}
