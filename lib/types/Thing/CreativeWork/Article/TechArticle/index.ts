import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface TechArticleProps {
	/** Prerequisites needed to fulfill steps in article. */
	dependencies?: Text
	/** Proficiency needed for this content; expected values: 'Beginner', 'Expert'. */
	proficiencyLevel?: Text
}

type TechArticle =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& TechArticleProps

export default TechArticle
