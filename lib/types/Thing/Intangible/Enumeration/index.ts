import type Class from "../Class/index.ts"
import type Intangible from "../index.ts"
import type Property from "../Property/index.ts"

export default interface Enumeration extends Intangible {
	/** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
	supersededBy?: Enumeration | Class | Property
}
