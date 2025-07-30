import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ComputerLanguage from "../../Intangible/ComputerLanguage/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type SoftwareApplication from "../SoftwareApplication/index.ts"

import SoftwareApplicationComponent from "../../../../components/Thing/CreativeWork/SoftwareApplication/index.ts"
import ComputerLanguageComponent from "../../../../components/Thing/Intangible/ComputerLanguage/index.ts"

export interface SoftwareSourceCodeProps {
	"@type"?: "SoftwareSourceCode"
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
