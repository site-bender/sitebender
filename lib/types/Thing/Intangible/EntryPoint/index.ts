import type { Text, URL } from "../../../DataType/index.ts"
import type SoftwareApplication from "../../CreativeWork/SoftwareApplication/index.ts"
import type Thing from "../../index.ts"
import type DigitalPlatformEnumeration from "../Enumeration/DigitalPlatformEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"

export interface EntryPointProps {
	/** An application that can complete the request. */
	actionApplication?: SoftwareApplication
	/** The high level platform(s) where the Action can be performed for the given URL. To specify a specific application or operating system instance, use actionApplication. */
	actionPlatform?: Text | URL | DigitalPlatformEnumeration
	/** An application that can complete the request. */
	application?: SoftwareApplication
	/** The supported content type(s) for an EntryPoint response. */
	contentType?: Text
	/** The supported encoding type(s) for an EntryPoint request. */
	encodingType?: Text
	/** An HTTP method that specifies the appropriate HTTP method for a request to an HTTP EntryPoint. Values are capitalized strings as used in HTTP. */
	httpMethod?: Text
	/** An url template (RFC6570) that will be used to construct the target of the execution of the action. */
	urlTemplate?: Text
}

type EntryPoint =
	& Thing
	& IntangibleProps
	& EntryPointProps

export default EntryPoint
