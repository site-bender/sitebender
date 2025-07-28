import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

import BackgroundNewsArticleComponent from "../../../../../../../components/Thing/CreativeWork/Article/NewsArticle/BackgroundNewsArticle/index.tsx"

export interface BackgroundNewsArticleProps {
}

type BackgroundNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& BackgroundNewsArticleProps

export default BackgroundNewsArticle
