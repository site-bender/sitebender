import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { LegislationProps } from "../index.ts"
import type LegalValueLevel from "../../../Intangible/Enumeration/LegalValueLevel/index.ts"

export interface LegislationObjectProps {
	legislationLegalValue?: LegalValueLevel
}

type LegislationObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& LegislationProps
	& LegislationObjectProps

export default LegislationObject
