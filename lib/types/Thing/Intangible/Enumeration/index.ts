import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Class from "../Class/index.ts"
import type Property from "../Property/index.ts"

export interface EnumerationProps {
	supersededBy?: Class | Enumeration | Property
}

type Enumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps

export default Enumeration
