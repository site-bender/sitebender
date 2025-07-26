import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ComputerLanguage from "../../Intangible/ComputerLanguage/index.ts"
import type SoftwareApplication from "../SoftwareApplication/index.ts"

export interface SoftwareSourceCodeProps {
	codeRepository?: URL
	codeSampleType?: Text
	programmingLanguage?: ComputerLanguage | Text
	runtime?: Text
	runtimePlatform?: Text
	sampleType?: Text
	targetProduct?: SoftwareApplication
}

type SoftwareSourceCode =
	& Thing
	& CreativeWorkProps
	& SoftwareSourceCodeProps

export default SoftwareSourceCode
