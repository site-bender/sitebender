// Researcher extends Audience but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ResearcherProps {}

type Researcher =
	& Thing
	& AudienceProps
	& IntangibleProps
	& ResearcherProps

export default Researcher
