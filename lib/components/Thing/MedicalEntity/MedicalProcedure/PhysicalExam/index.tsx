import type BaseProps from "../../../../../types/index.ts"
import type PhysicalExamProps from "../../../../../types/Thing/MedicalEntity/MedicalProcedure/PhysicalExam/index.ts"

import MedicalProcedure from "../index.tsx"

export type Props = PhysicalExamProps & BaseProps

export default function PhysicalExam({
	_type = "PhysicalExam",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalProcedure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalProcedure>
	)
}
