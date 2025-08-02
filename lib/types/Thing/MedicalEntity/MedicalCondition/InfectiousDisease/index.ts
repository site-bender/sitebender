import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type InfectiousAgentClass from "../../../Intangible/Enumeration/MedicalEnumeration/InfectiousAgentClass/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalConditionProps } from "../index.ts"

import InfectiousAgentClassComponent from "../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/InfectiousAgentClass/index.ts"

export type InfectiousDiseaseType = "InfectiousDisease"

export interface InfectiousDiseaseProps {
	"@type"?: InfectiousDiseaseType
	infectiousAgent?: Text
	infectiousAgentClass?:
		| InfectiousAgentClass
		| ReturnType<typeof InfectiousAgentClassComponent>
	transmissionMethod?: Text
}

type InfectiousDisease =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& InfectiousDiseaseProps

export default InfectiousDisease
