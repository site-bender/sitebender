import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

import TechArticleComponent from "../../../../../../components/Thing/CreativeWork/Article/TechArticle/index.tsx"

export interface TechArticleProps {
	dependencies?: Text
	proficiencyLevel?: Text
}

type TechArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& TechArticleProps

export default TechArticle
