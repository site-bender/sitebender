import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type Property from "../Property/index.ts"

import ClassComponent from "../../../../../components/Thing/Intangible/Class/index.tsx"

export interface ClassProps {
	supersededBy?: Class | Enumeration | Property
}

type Class =
	& Thing
	& IntangibleProps
	& ClassProps

export default Class
