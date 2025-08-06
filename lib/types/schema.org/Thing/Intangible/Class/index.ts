import type Thing from "../../index.ts"
import type Enumeration from "../Enumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

import { Class as ClassComponent } from "../../../../../components/index.tsx"
import { Enumeration as EnumerationComponent } from "../../../../../components/index.tsx"
import { Property as PropertyComponent } from "../../../../../components/index.tsx"

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
