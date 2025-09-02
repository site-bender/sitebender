import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"

export type ResearcherType = "Researcher"

export interface ResearcherProps {
	"@type"?: ResearcherType
}

type Researcher = Thing & IntangibleProps & AudienceProps & ResearcherProps

export default Researcher
