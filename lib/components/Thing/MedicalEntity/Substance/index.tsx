import type BaseProps from "../../../../types/index.ts"
import type SubstanceProps from "../../../../types/Thing/MedicalEntity/Substance/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = SubstanceProps & BaseProps

export default function Substance({
	activeIngredient,
	maximumIntake,
	_type = "Substance",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				activeIngredient,
				maximumIntake,
				...subtypeProperties,
			}}
		>{children}</MedicalEntity>
	)
}
