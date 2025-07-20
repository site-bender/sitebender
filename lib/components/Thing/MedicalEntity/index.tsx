import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../types/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../types/Thing/MedicalEntity/index.ts"

import Thing from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalEntityProps,
	"MedicalEntity",
	ExtractLevelProps<MedicalEntityProps, ThingProps>
>

export default function MedicalEntity(props: Props) {
	const {
		code,
		funding,
		guideline,
		legalStatus,
		medicineSystem,
		recognizingAuthority,
		relevantSpecialty,
		study,
		schemaType,
		subtypeProperties,
		format,
		...restProps
	} = props

	const thingData = Thing(restProps)

	return {
		props: {
			...thingData.props,
			code,
			funding,
			guideline,
			legalStatus,
			medicineSystem,
			recognizingAuthority,
			relevantSpecialty,
			study,
		},
	}
}
