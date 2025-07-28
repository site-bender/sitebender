import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Class from "../Class/index.ts"
import type Enumeration from "../Enumeration/index.ts"

import PropertyComponent from "../../../../../components/Thing/Intangible/Property/index.tsx"

export interface PropertyProps {
	domainIncludes?: Class
	inverseOf?: Property
	rangeIncludes?: Class
	supersededBy?: Class | Enumeration | Property
}

type Property =
	& Thing
	& IntangibleProps
	& PropertyProps

export default Property
