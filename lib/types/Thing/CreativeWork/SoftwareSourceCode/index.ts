import type { Language } from "../../../bcp47/index.ts"
import type { Text, URL } from "../../../DataType/index.ts"
import type ComputerLanguage from "../../Intangible/ComputerLanguage/index.ts"
import type CreativeWork from "../index.ts"
import type SoftwareApplication from "../SoftwareApplication/index.ts"

export default interface SoftwareSourceCode extends CreativeWork {
	/** Link to the repository where the un-compiled, human readable code and related code is located (SVN, GitHub, CodePlex). */
	codeRepository?: URL
	/** What type of code sample: full (compile ready) solution, code snippet, inline code, scripts, template. */
	codeSampleType?: Text
	/** The computer programming language. */
	programmingLanguage?: Text | ComputerLanguage
	/** Runtime platform or script interpreter dependencies (example: Java v1, Python 2.3, .NET Framework 3.0). */
	runtime?: Text
	/** Runtime platform or script interpreter dependencies (example: Java v1, Python 2.3, .NET Framework 3.0). */
	runtimePlatform?: Text
	/** What type of code sample: full (compile ready) solution, code snippet, inline code, scripts, template. */
	sampleType?: Text
	/** Target Operating System / Product to which the code applies.  If applies to several versions, just the product name can be used. */
	targetProduct?: SoftwareApplication
}
