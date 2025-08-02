import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type InfectiousAgentClassType = "InfectiousAgentClass"

export interface InfectiousAgentClassProps {
	"@type"?: InfectiousAgentClassType
}

type InfectiousAgentClass =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& InfectiousAgentClassProps

export default InfectiousAgentClass
