import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalSpecialtyProps from "../../../../../../types/Thing/MedicalSpecialty/index.ts"
import type SpecialtyProps from "../../../../../../types/Thing/Specialty/index.ts"

import Specialty from "../index.tsx"

// MedicalSpecialty adds no properties to the Specialty schema type
export type Props = BaseComponentProps<
	MedicalSpecialtyProps,
	"MedicalSpecialty",
	ExtractLevelProps<MedicalSpecialtyProps, SpecialtyProps>
>

export default function MedicalSpecialty({
	_type = "MedicalSpecialty",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Specialty
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		/>
	)
}
