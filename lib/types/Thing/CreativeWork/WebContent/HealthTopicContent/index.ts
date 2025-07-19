import type Thing from "../../../index.ts"
import type HealthAspectEnumeration from "../../../Intangible/Enumeration/HealthAspectEnumeration/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebContentProps } from "../index.ts"

export interface HealthTopicContentProps {
	/** Indicates the aspect or aspects specifically addressed in some [[HealthTopicContent]]. For example, that the content is an overview, or that it talks about treatment, self-care, treatments or their side-effects. */
	hasHealthAspect?: HealthAspectEnumeration
}

type HealthTopicContent =
	& Thing
	& CreativeWorkProps
	& WebContentProps
	& HealthTopicContentProps

export default HealthTopicContent
