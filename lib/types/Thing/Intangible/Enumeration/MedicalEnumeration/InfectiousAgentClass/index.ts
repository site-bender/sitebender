import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export interface InfectiousAgentClassProps {
}

type InfectiousAgentClass =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& InfectiousAgentClassProps

export default InfectiousAgentClass
