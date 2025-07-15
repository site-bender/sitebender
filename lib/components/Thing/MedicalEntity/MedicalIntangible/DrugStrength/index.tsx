import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DrugStrengthProps from "../../../../../types/Thing/DrugStrength/index.ts"
import type MedicalIntangibleProps from "../../../../../types/Thing/MedicalIntangible/index.ts"

import MedicalIntangible from "./index.tsx"

export type Props = BaseComponentProps<
	DrugStrengthProps,
	"DrugStrength",
	ExtractLevelProps<DrugStrengthProps, MedicalIntangibleProps>
>

export default function DrugStrength(
	{
		activeIngredient,
		availableIn,
		maximumIntake,
		strengthUnit,
		strengthValue,
		schemaType = "DrugStrength",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
