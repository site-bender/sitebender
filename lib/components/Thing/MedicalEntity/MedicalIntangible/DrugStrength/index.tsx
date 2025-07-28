import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalIntangibleProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/index.ts"
import type { DrugStrengthProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DrugStrength/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	DrugStrengthProps,
	"DrugStrength",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalIntangibleProps>
>

export default function DrugStrength({
	activeIngredient,
	availableIn,
	maximumIntake,
	strengthUnit,
	strengthValue,
	schemaType = "DrugStrength",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalIntangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				activeIngredient,
				availableIn,
				maximumIntake,
				strengthUnit,
				strengthValue,
				...subtypeProperties,
			}}
		/>
	)
}
