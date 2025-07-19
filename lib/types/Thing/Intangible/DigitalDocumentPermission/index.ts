import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Audience from "../Audience/index.ts"
import type DigitalDocumentPermissionType from "../Enumeration/DigitalDocumentPermissionType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

export interface DigitalDocumentPermissionProps {
	/** The person, organization, contact point, or audience that has been granted this permission. */
	grantee?: Audience | Organization | ContactPoint | Person
	/** The type of permission granted the person, organization, or audience. */
	permissionType?: DigitalDocumentPermissionType
}

type DigitalDocumentPermission =
	& Thing
	& IntangibleProps
	& DigitalDocumentPermissionProps

export default DigitalDocumentPermission
