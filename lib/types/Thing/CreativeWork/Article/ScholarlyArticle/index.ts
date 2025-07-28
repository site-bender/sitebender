import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

import ScholarlyArticleComponent from "../../../../../../components/Thing/CreativeWork/Article/ScholarlyArticle/index.tsx"

export interface ScholarlyArticleProps {
}

type ScholarlyArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& ScholarlyArticleProps

export default ScholarlyArticle
