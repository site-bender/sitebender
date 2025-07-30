import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface TechArticleProps {
	"@type"?: "TechArticle"
	dependencies?: Text
	proficiencyLevel?: Text
}

type TechArticle = Thing & CreativeWorkProps & ArticleProps & TechArticleProps

export default TechArticle
