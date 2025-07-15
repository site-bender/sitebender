import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"
import type SubstanceProps from "../../../../types/Thing/Substance/index.ts"

import MedicalEntity from "./index.tsx"

export type Props = BaseComponentProps<
	SubstanceProps,
	"Substance",
	ExtractLevelProps<SubstanceProps, MedicalEntityProps>
>

export default function Substance(
	{
		activeIngredient,
		maximumIntake,
		schemaType = "Substance",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				activeIngredient,
				maximumIntake,
				...subtypeProperties,
			}}
		/>
	)
}
