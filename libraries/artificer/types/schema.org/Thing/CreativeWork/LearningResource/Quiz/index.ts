import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LearningResourceProps } from "../index.ts"

export type QuizType = "Quiz"

export interface QuizProps {
	"@type"?: QuizType
}

type Quiz = Thing & CreativeWorkProps & LearningResourceProps & QuizProps

export default Quiz
