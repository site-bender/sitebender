import type { Text, URL } from "../../../DataType/index.ts"
import type SoftwareApplication from "../../CreativeWork/SoftwareApplication/index.ts"
import type Thing from "../../index.ts"
import type DigitalPlatformEnumeration from "../Enumeration/DigitalPlatformEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"

import { DigitalPlatformEnumeration as DigitalPlatformEnumerationComponent } from "../../../../../components/index.tsx"
import { SoftwareApplication as SoftwareApplicationComponent } from "../../../../../components/index.tsx"

export type EntryPointType = "EntryPoint"

export interface EntryPointProps {
	"@type"?: EntryPointType
	actionApplication?:
		| SoftwareApplication
		| ReturnType<typeof SoftwareApplicationComponent>
	actionPlatform?:
		| DigitalPlatformEnumeration
		| Text
		| URL
		| ReturnType<typeof DigitalPlatformEnumerationComponent>
	application?:
		| SoftwareApplication
		| ReturnType<typeof SoftwareApplicationComponent>
	contentType?: Text
	encodingType?: Text
	httpMethod?: Text
	urlTemplate?: Text
}

type EntryPoint = Thing & IntangibleProps & EntryPointProps

export default EntryPoint
