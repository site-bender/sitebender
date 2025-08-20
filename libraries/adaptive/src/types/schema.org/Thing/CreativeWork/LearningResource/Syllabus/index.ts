import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LearningResourceProps } from "../index.ts"

export type SyllabusType = "Syllabus"

export interface SyllabusProps {
	"@type"?: SyllabusType
}

type Syllabus =
	& Thing
	& CreativeWorkProps
	& LearningResourceProps
	& SyllabusProps

export default Syllabus
