import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalConditionProps } from "../index.ts"
import type InfectiousAgentClass from "../../../Intangible/Enumeration/MedicalEnumeration/InfectiousAgentClass/index.ts"

export interface InfectiousDiseaseProps {
	infectiousAgent?: Text
	infectiousAgentClass?: InfectiousAgentClass
	transmissionMethod?: Text
}

type InfectiousDisease =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& InfectiousDiseaseProps

export default InfectiousDisease
