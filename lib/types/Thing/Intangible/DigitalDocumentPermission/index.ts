import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Audience from "../Audience/index.ts"
import type DigitalDocumentPermissionType from "../Enumeration/DigitalDocumentPermissionType/index.ts"
import type Intangible from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

export default interface DigitalDocumentPermission extends Intangible {
	/** The person, organization, contact point, or audience that has been granted this permission. */
	grantee?: Audience | Organization | ContactPoint | Person
	/** The type of permission granted the person, organization, or audience. */
	permissionType?: DigitalDocumentPermissionType
}
