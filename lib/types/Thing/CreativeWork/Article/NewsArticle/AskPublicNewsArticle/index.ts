import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

import AskPublicNewsArticleComponent from "../../../../../../../components/Thing/CreativeWork/Article/NewsArticle/AskPublicNewsArticle/index.tsx"

export interface AskPublicNewsArticleProps {
}

type AskPublicNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& AskPublicNewsArticleProps

export default AskPublicNewsArticle
