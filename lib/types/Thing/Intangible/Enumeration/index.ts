import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

export interface EnumerationProps {
	/** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
	supersededBy?: Enumeration | Class | Property
}

type Enumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps

export default Enumeration
