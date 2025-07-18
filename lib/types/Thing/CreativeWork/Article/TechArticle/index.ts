import type { Text } from "../../../../DataType/index.ts"
import type Article from "../index.ts"

export default interface TechArticle extends Article {
	/** Prerequisites needed to fulfill steps in article. */
	dependencies?: Text
	/** Proficiency needed for this content; expected values: 'Beginner', 'Expert'. */
	proficiencyLevel?: Text
}
