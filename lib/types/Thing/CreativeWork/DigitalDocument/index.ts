import type Thing from "../../index.ts"
import type DigitalDocumentPermission from "../../Intangible/DigitalDocumentPermission/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface DigitalDocumentProps {
	/** A permission related to the access to this document (e.g. permission to read or write an electronic document). For a public document, specify a grantee with an Audience with audienceType equal to "public". */
	hasDigitalDocumentPermission?: DigitalDocumentPermission
}

type DigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps

export default DigitalDocument
