import type BaseProps from "../../../../../../types/index.ts"
import type PhysicalExamProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/PhysicalExam/index.ts"

import MedicalEnumeration from "../index.tsx"

// PhysicalExam adds no properties to the ListItem schema type
export type Props = PhysicalExamProps & BaseProps

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
		>
			{children}
		</MedicalEnumeration>
	)
}
