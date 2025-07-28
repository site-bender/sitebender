import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type DigitalDocumentPermission from "../../Intangible/DigitalDocumentPermission/index.ts"

import DigitalDocumentComponent from "../../../../../components/Thing/CreativeWork/DigitalDocument/index.tsx"

export interface DigitalDocumentProps {
	hasDigitalDocumentPermission?: DigitalDocumentPermission
}

type DigitalDocument =
	& Thing
	& CreativeWorkProps
	& DigitalDocumentProps

export default DigitalDocument
