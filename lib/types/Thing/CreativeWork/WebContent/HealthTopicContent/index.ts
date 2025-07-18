import type HealthAspectEnumeration from "../../../Intangible/Enumeration/HealthAspectEnumeration/index.ts"
import type WebContent from "../index.ts"

export default interface HealthTopicContent extends WebContent {
	/** Indicates the aspect or aspects specifically addressed in some [[HealthTopicContent]]. For example, that the content is an overview, or that it talks about treatment, self-care, treatments or their side-effects. */
	hasHealthAspect?: HealthAspectEnumeration
}
