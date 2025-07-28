import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebContentProps } from "../index.ts"
import type HealthAspectEnumeration from "../../../Intangible/Enumeration/HealthAspectEnumeration/index.ts"

import HealthTopicContentComponent from "../../../../../../components/Thing/CreativeWork/WebContent/HealthTopicContent/index.tsx"

export interface HealthTopicContentProps {
	hasHealthAspect?: HealthAspectEnumeration
}

type HealthTopicContent =
	& Thing
	& CreativeWorkProps
	& WebContentProps
	& HealthTopicContentProps

export default HealthTopicContent
