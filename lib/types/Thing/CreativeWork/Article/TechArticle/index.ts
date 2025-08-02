import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"
import type { APIReferenceType } from "./APIReference/index.ts"

export type TechArticleType = "TechArticle" | APIReferenceType

export interface TechArticleProps {
	"@type"?: TechArticleType
	dependencies?: Text
	proficiencyLevel?: Text
}

type TechArticle = Thing & CreativeWorkProps & ArticleProps & TechArticleProps

export default TechArticle
