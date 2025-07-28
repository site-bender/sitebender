import type { Text, URL } from "../../../DataType/index.ts"
import type SoftwareApplication from "../../CreativeWork/SoftwareApplication/index.ts"
import type Thing from "../../index.ts"
import type DigitalPlatformEnumeration from "../Enumeration/DigitalPlatformEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"

import SoftwareApplicationComponent from "../../../../components/Thing/CreativeWork/SoftwareApplication/index.ts"
import DigitalPlatformEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/DigitalPlatformEnumeration/index.ts"

export interface EntryPointProps {
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
