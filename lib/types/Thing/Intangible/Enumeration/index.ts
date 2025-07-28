import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

import ClassComponent from "../../../../components/Thing/Intangible/Class/index.ts"
import EnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/index.ts"
import PropertyComponent from "../../../../components/Thing/Intangible/Property/index.ts"

export interface EnumerationProps {
	supersededBy?:
		| Class
		| Enumeration
		| Property
		| ReturnType<typeof ClassComponent>
		| ReturnType<typeof EnumerationComponent>
		| ReturnType<typeof PropertyComponent>
}

type Enumeration = Thing & IntangibleProps & EnumerationProps

export default Enumeration
