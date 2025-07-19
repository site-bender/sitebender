// Syllabus extends LearningResource but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LearningResourceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface SyllabusProps {}

type Syllabus =
	& Thing
	& CreativeWorkProps
	& LearningResourceProps
	& SyllabusProps

export default Syllabus
