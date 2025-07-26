import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type MaximumDoseSchedule from "../DoseSchedule/MaximumDoseSchedule/index.ts"

export interface DrugStrengthProps {
	activeIngredient?: Text
	availableIn?: AdministrativeArea
	maximumIntake?: MaximumDoseSchedule
	strengthUnit?: Text
	strengthValue?: Number
}

type DrugStrength =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DrugStrengthProps

export default DrugStrength
