import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type { IntangibleProps } from "../index.ts"

import ClassComponent from "../../../../../../codewright/src/define/Thing/Intangible/Class/index.tsx"
import EnumerationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/index.tsx"
import PropertyComponent from "../../../../../../codewright/src/define/Thing/Intangible/Property/index.tsx"

export type PropertyType = "Property"

export interface PropertyProps {
	"@type"?: PropertyType
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
