import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LearningResourceProps } from "../index.ts"

export interface SyllabusProps {
}

type Syllabus =
	& Thing
	& CreativeWorkProps
	& LearningResourceProps
	& SyllabusProps

export default Syllabus
