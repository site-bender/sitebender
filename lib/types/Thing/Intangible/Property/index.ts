import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type { IntangibleProps } from "../index.ts"

import ClassComponent from "../../../../components/Thing/Intangible/Class/index.ts"
import EnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/index.ts"
import PropertyComponent from "../../../../components/Thing/Intangible/Property/index.ts"

export interface PropertyProps {
	domainIncludes?: Class | ReturnType<typeof ClassComponent>
	inverseOf?: Property | ReturnType<typeof PropertyComponent>
	rangeIncludes?: Class | ReturnType<typeof ClassComponent>
	supersededBy?:
		| Class
		| Enumeration
		| Property
		| ReturnType<typeof ClassComponent>
		| ReturnType<typeof EnumerationComponent>
		| ReturnType<typeof PropertyComponent>
}

type Property = Thing & IntangibleProps & PropertyProps

export default Property
