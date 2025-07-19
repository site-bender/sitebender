import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type InfectiousAgentClass from "../../../Intangible/Enumeration/MedicalEnumeration/InfectiousAgentClass/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalConditionProps } from "../index.ts"

export interface InfectiousDiseaseProps {
	/** The actual infectious agent, such as a specific bacterium. */
	infectiousAgent?: Text
	/** The class of infectious agent (bacteria, prion, etc.) that causes the disease. */
	infectiousAgentClass?: InfectiousAgentClass
	/** How the disease spreads, either as a route or vector, for example 'direct contact', 'Aedes aegypti', etc. */
	transmissionMethod?: Text
}

type InfectiousDisease =
	& Thing
	& MedicalConditionProps
	& MedicalEntityProps
	& InfectiousDiseaseProps

export default InfectiousDisease
