import type BaseProps from "../../../../../types/index.ts"
import type DrugStrengthProps from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DrugStrength/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = DrugStrengthProps & BaseProps

export default function DrugStrength({
	activeIngredient,
	availableIn,
	maximumIntake,
	strengthUnit,
	strengthValue,
	_type = "DrugStrength",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIntangible
			{...props}
			_type={_type}
			subtypeProperties={{
				activeIngredient,
				availableIn,
				maximumIntake,
				strengthUnit,
				strengthValue,
				...subtypeProperties,
			}}
		>{children}</MedicalIntangible>
	)
}
