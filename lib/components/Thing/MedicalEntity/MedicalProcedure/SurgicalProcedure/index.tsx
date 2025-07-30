import type BaseProps from "../../../../../types/index.ts"
import type SurgicalProcedureProps from "../../../../../types/Thing/MedicalEntity/MedicalProcedure/SurgicalProcedure/index.ts"

import MedicalProcedure from "../index.tsx"

export type Props = SurgicalProcedureProps & BaseProps

export default function SurgicalProcedure({
	_type = "SurgicalProcedure",
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
