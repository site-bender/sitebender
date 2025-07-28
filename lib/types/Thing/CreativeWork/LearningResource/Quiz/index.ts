import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LearningResourceProps } from "../index.ts"

import QuizComponent from "../../../../../../components/Thing/CreativeWork/LearningResource/Quiz/index.tsx"

export interface QuizProps {
}

type Quiz =
	& Thing
	& CreativeWorkProps
	& LearningResourceProps
	& QuizProps

export default Quiz
