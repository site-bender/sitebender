import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface ScholarlyArticleProps {
	"@type"?: "ScholarlyArticle"}

type ScholarlyArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& ScholarlyArticleProps

export default ScholarlyArticle
