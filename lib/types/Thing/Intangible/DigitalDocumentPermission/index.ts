import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Audience from "../Audience/index.ts"
import type DigitalDocumentPermissionType from "../Enumeration/DigitalDocumentPermissionType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

import AudienceComponent from "../../../../components/Thing/Intangible/Audience/index.ts"
import DigitalDocumentPermissionTypeComponent from "../../../../components/Thing/Intangible/Enumeration/DigitalDocumentPermissionType/index.ts"
import ContactPointComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface DigitalDocumentPermissionProps {
	"@type"?: "DigitalDocumentPermission"
	grantee?:
		| Audience
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	permissionType?:
		| DigitalDocumentPermissionType
		| ReturnType<typeof DigitalDocumentPermissionTypeComponent>
}

type DigitalDocumentPermission =
	& Thing
	& IntangibleProps
	& DigitalDocumentPermissionProps

export default DigitalDocumentPermission
