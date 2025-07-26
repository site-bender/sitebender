import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebContentProps } from "../index.ts"
import type HealthAspectEnumeration from "../../../Intangible/Enumeration/HealthAspectEnumeration/index.ts"

export interface HealthTopicContentProps {
	hasHealthAspect?: HealthAspectEnumeration
}

type HealthTopicContent =
	& Thing
	& CreativeWorkProps
	& WebContentProps
	& HealthTopicContentProps

export default HealthTopicContent
