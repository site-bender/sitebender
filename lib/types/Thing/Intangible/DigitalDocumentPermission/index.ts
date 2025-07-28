import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Audience from "../Audience/index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type DigitalDocumentPermissionType from "../Enumeration/DigitalDocumentPermissionType/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

import DigitalDocumentPermissionComponent from "../../../../../components/Thing/Intangible/DigitalDocumentPermission/index.tsx"

export interface DigitalDocumentPermissionProps {
	grantee?: Audience | ContactPoint | Organization | Person
	permissionType?: DigitalDocumentPermissionType
}

type DigitalDocumentPermission =
	& Thing
	& IntangibleProps
	& DigitalDocumentPermissionProps

export default DigitalDocumentPermission
