import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Audience from "../Audience/index.ts"
import type DigitalDocumentPermissionTypeEnum from "../Enumeration/DigitalDocumentPermissionType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

import { Audience as AudienceComponent } from "../../../../../components/index.tsx"
import { ContactPoint as ContactPointComponent } from "../../../../../components/index.tsx"
import { DigitalDocumentPermissionType as DigitalDocumentPermissionTypeComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

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
		| DigitalDocumentPermissionTypeEnum
		| ReturnType<typeof DigitalDocumentPermissionTypeComponent>
}

type DigitalDocumentPermission =
	& Thing
	& IntangibleProps
	& DigitalDocumentPermissionProps

export default DigitalDocumentPermission
