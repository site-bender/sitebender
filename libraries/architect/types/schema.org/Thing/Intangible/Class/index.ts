import type Thing from "../../index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

import ClassComponent from "../../../../../../codewright/src/define/Thing/Intangible/Class/index.tsx"
import EnumerationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/index.tsx"
import PropertyComponent from "../../../../../../codewright/src/define/Thing/Intangible/Property/index.tsx"

export type ClassType = "Class"

export interface ClassProps {
	"@type"?: ClassType
	supersededBy?:
		| Class
		| Enumeration
		| Property
		| ReturnType<typeof ClassComponent>
		| ReturnType<typeof EnumerationComponent>
		| ReturnType<typeof PropertyComponent>
}

type Class = Thing & IntangibleProps & ClassProps

export default Class
