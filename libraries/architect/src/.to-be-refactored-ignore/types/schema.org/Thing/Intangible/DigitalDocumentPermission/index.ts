import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Audience from "../Audience/index.ts"
import type _DigitalDocumentPermissionTypeEnum from "../Enumeration/DigitalDocumentPermissionType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

import AudienceComponent from "../../../../../src/define/Thing/Intangible/Audience/index.tsx"
import DigitalDocumentPermissionTypeComponent from "../../../../../src/define/Thing/Intangible/Enumeration/DigitalDocumentPermissionType/index.tsx"
import ContactPointComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../src/define/Thing/Person/index.tsx"

export type DigitalDocumentPermissionType = "DigitalDocumentPermission"

export interface DigitalDocumentPermissionProps {
	"@type"?: DigitalDocumentPermissionType
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
