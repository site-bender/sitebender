// InfectiousAgentClass extends MedicalEnumeration but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface InfectiousAgentClassProps {}

type InfectiousAgentClass =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& MedicalEnumerationProps
	& InfectiousAgentClassProps

export default InfectiousAgentClass
