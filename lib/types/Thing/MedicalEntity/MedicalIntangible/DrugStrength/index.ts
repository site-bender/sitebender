import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type MaximumDoseSchedule from "../DoseSchedule/MaximumDoseSchedule/index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

import MaximumDoseScheduleComponent from "../../../../../components/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import AdministrativeAreaComponent from "../../../../../components/Thing/Place/AdministrativeArea/index.ts"

export interface DrugStrengthProps {
	"@type"?: "DrugStrength"
	activeIngredient?: Text
	availableIn?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
	maximumIntake?:
		| MaximumDoseSchedule
		| ReturnType<typeof MaximumDoseScheduleComponent>
	strengthUnit?: Text
	strengthValue?: Number
}

type DrugStrength =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DrugStrengthProps

export default DrugStrength
