import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export interface AskPublicNewsArticleProps {
	"@type"?: "AskPublicNewsArticle"}

type AskPublicNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& AskPublicNewsArticleProps

export default AskPublicNewsArticle
