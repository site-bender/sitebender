// BackgroundNewsArticle extends NewsArticle but adds no additional properties
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface BackgroundNewsArticleProps {}

type BackgroundNewsArticle =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& NewsArticleProps
	& BackgroundNewsArticleProps

export default BackgroundNewsArticle
