import type { Class, Property } from "../../index.ts"
import type { Intangible } from "../index.ts"

// Enumeration interface - extends Intangible
// Lists or enumerations—for example, a list of cuisines or music genres, etc.
export interface Enumeration extends Intangible {
	supersededBy?: Class | Enumeration | Property
}
