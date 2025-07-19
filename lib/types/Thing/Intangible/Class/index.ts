import type Thing from "../../index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

export interface ClassProps {
	/** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
	supersededBy?: Enumeration | Class | Property
}

type Class =
	& Thing
	& IntangibleProps
	& ClassProps

export default Class
