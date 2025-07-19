import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type { IntangibleProps } from "../index.ts"

export interface PropertyProps {
	/** Relates a property to a class that is (one of) the type(s) the property is expected to be used on. */
	domainIncludes?: Class
	/** Relates a property to a property that is its inverse. Inverse properties relate the same pairs of items to each other, but in reversed direction. For example, the 'alumni' and 'alumniOf' properties are inverseOf each other. Some properties don't have explicit inverses; in these situations RDFa and JSON-LD syntax for reverse properties can be used. */
	inverseOf?: Property
	/** Relates a property to a class that constitutes (one of) the expected type(s) for values of the property. */
	rangeIncludes?: Class
	/** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
	supersededBy?: Enumeration | Class | Property
}

type Property =
	& Thing
	& IntangibleProps
	& PropertyProps

export default Property
