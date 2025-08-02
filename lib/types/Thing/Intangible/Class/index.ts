import type Thing from "../../index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

import ClassComponent from "../../../../components/Thing/Intangible/Class/index.ts"
import EnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/index.ts"
import PropertyComponent from "../../../../components/Thing/Intangible/Property/index.ts"

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
