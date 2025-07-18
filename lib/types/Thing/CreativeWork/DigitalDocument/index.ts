import type DigitalDocumentPermission from "../../Intangible/DigitalDocumentPermission/index.ts"
import type CreativeWork from "../index.ts"

export default interface DigitalDocument extends CreativeWork {
	/** A permission related to the access to this document (e.g. permission to read or write an electronic document). For a public document, specify a grantee with an Audience with audienceType equal to "public". */
	hasDigitalDocumentPermission?: DigitalDocumentPermission
}
