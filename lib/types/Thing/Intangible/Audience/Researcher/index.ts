import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"

import ResearcherComponent from "../../../../../../components/Thing/Intangible/Audience/Researcher/index.tsx"

export interface ResearcherProps {
}

type Researcher =
	& Thing
	& IntangibleProps
	& AudienceProps
	& ResearcherProps

export default Researcher
