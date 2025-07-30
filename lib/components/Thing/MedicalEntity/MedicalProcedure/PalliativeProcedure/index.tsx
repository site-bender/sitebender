import type BaseProps from "../../../../../types/index.ts"
import type PalliativeProcedureProps from "../../../../../types/Thing/MedicalEntity/MedicalProcedure/PalliativeProcedure/index.ts"

import MedicalProcedure from "../index.tsx"

export type Props = PalliativeProcedureProps & BaseProps

export default function PalliativeProcedure({
	_type = "PalliativeProcedure",
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
