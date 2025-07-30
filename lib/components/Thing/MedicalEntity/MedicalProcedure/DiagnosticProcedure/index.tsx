import type BaseProps from "../../../../../types/index.ts"
import type DiagnosticProcedureProps from "../../../../../types/Thing/MedicalEntity/MedicalProcedure/DiagnosticProcedure/index.ts"

import MedicalProcedure from "../index.tsx"

export type Props = DiagnosticProcedureProps & BaseProps

export default function DiagnosticProcedure({
	_type = "DiagnosticProcedure",
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
