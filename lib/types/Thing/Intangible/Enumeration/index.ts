import Class from "../Class/index.ts"
import Intangible from "../index.ts"
import Property from "../Property/index.ts"

export default interface Enumeration extends Intangible {
	/** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
	supersededBy?: Enumeration | Class | Property
}
