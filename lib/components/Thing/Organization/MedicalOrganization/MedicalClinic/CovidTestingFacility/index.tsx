import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CovidTestingFacilityProps from "../../../../../../types/Thing/CovidTestingFacility/index.ts"
import type MedicalClinicProps from "../../../../../../types/Thing/MedicalClinic/index.ts"

import MedicalClinic from "./index.tsx"

// CovidTestingFacility adds no properties to the MedicalClinic schema type
export type Props = BaseComponentProps<
	CovidTestingFacilityProps,
	"CovidTestingFacility",
	ExtractLevelProps<CovidTestingFacilityProps, MedicalClinicProps>
>

export default function CovidTestingFacility({
	schemaType = "CovidTestingFacility",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalClinic
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
