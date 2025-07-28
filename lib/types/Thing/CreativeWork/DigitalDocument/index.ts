import type Thing from "../../index.ts"
import type DigitalDocumentPermission from "../../Intangible/DigitalDocumentPermission/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import DigitalDocumentPermissionComponent from "../../../../components/Thing/Intangible/DigitalDocumentPermission/index.ts"

export interface DigitalDocumentProps {
	hasDigitalDocumentPermission?:
		| DigitalDocumentPermission
		| ReturnType<typeof DigitalDocumentPermissionComponent>
}

type DigitalDocument = Thing & CreativeWorkProps & DigitalDocumentProps

export default DigitalDocument
