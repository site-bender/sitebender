import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import Audience from "../Audience/index.ts"
import DigitalDocumentPermissionType from "../Enumeration/DigitalDocumentPermissionType/index.ts"
import Intangible from "../index.ts"
import ContactPoint from "../StructuredValue/ContactPoint/index.ts"

export default interface DigitalDocumentPermission extends Intangible {
	/** The person, organization, contact point, or audience that has been granted this permission. */
	grantee?: Audience | Organization | ContactPoint | Person
	/** The type of permission granted the person, organization, or audience. */
	permissionType?: DigitalDocumentPermissionType
}
