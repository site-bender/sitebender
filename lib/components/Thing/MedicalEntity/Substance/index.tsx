import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { SubstanceProps } from "../../../../types/Thing/MedicalEntity/Substance/index.ts"

import Thing from "../../index.tsx"
import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	SubstanceProps,
	"Substance",
	ExtractLevelProps<SubstanceProps, MedicalEntityProps>
>

export default function Substance(props: Props) {
	const {
		activeIngredient,
		maximumIntake,
		schemaType,
		subtypeProperties,
		format,
		...restProps
	} = props

	const thingData = Thing(restProps)
	const medicalEntityData = MedicalEntity(restProps)

	return {
		props: {
			...thingData.props,
			...medicalEntityData.props,
			activeIngredient,
			maximumIntake,
		},
	}
}
