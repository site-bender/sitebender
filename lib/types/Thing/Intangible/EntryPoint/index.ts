import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type DigitalPlatformEnumeration from "../Enumeration/DigitalPlatformEnumeration/index.ts"
import type SoftwareApplication from "../../CreativeWork/SoftwareApplication/index.ts"

import EntryPointComponent from "../../../../../components/Thing/Intangible/EntryPoint/index.tsx"

export interface EntryPointProps {
	actionApplication?: SoftwareApplication
	actionPlatform?: DigitalPlatformEnumeration | Text | URL
	application?: SoftwareApplication
	contentType?: Text
	encodingType?: Text
	httpMethod?: Text
	urlTemplate?: Text
}

type EntryPoint =
	& Thing
	& IntangibleProps
	& EntryPointProps

export default EntryPoint
