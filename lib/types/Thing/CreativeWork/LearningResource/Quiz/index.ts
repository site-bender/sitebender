import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LearningResourceProps } from "../index.ts"

export interface QuizProps {
	"@type"?: "Quiz"}

type Quiz = Thing & CreativeWorkProps & LearningResourceProps & QuizProps

export default Quiz
