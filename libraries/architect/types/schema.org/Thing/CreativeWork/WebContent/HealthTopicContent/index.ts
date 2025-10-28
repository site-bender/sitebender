import type Thing from "../../../index.ts"
import type HealthAspectEnumeration from "../../../Intangible/Enumeration/HealthAspectEnumeration/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebContentProps } from "../index.ts"

import HealthAspectEnumerationComponent from "../../../../../../src/define/Thing/Intangible/Enumeration/HealthAspectEnumeration/index.tsx"

export type HealthTopicContentType = "HealthTopicContent"

export interface HealthTopicContentProps {
	"@type"?: HealthTopicContentType
	hasHealthAspect?:
		| HealthAspectEnumeration
		| ReturnType<typeof HealthAspectEnumerationComponent>
}

type HealthTopicContent =
	& Thing
	& CreativeWorkProps
	& WebContentProps
	& HealthTopicContentProps

export default HealthTopicContent
