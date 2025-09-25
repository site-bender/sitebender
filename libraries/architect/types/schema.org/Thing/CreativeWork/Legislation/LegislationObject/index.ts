import type Thing from "../../../index.ts"
import type LegalValueLevel from "../../../Intangible/Enumeration/LegalValueLevel/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LegislationProps } from "../index.ts"

import LegalValueLevelComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/LegalValueLevel/index.tsx"

export type LegislationObjectType = "LegislationObject"

export interface LegislationObjectProps {
	"@type"?: LegislationObjectType
	legislationLegalValue?:
		| LegalValueLevel
		| ReturnType<typeof LegalValueLevelComponent>
}

type LegislationObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& LegislationProps
	& LegislationObjectProps

export default LegislationObject
