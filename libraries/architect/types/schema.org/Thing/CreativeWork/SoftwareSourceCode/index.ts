import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ComputerLanguage from "../../Intangible/ComputerLanguage/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type SoftwareApplication from "../SoftwareApplication/index.ts"

import SoftwareApplicationComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/SoftwareApplication/index.tsx"
import ComputerLanguageComponent from "../../../../../../pagewright/src/define/Thing/Intangible/ComputerLanguage/index.tsx"

export type SoftwareSourceCodeType = "SoftwareSourceCode"

export interface SoftwareSourceCodeProps {
	"@type"?: SoftwareSourceCodeType
	codeRepository?: URL
	codeSampleType?: Text
	programmingLanguage?:
		| ComputerLanguage
		| Text
		| ReturnType<typeof ComputerLanguageComponent>
	runtime?: Text
	runtimePlatform?: Text
	sampleType?: Text
	targetProduct?:
		| SoftwareApplication
		| ReturnType<typeof SoftwareApplicationComponent>
}

type SoftwareSourceCode = Thing & CreativeWorkProps & SoftwareSourceCodeProps

export default SoftwareSourceCode
