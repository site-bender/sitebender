import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface SatiricalArticleProps {}

type SatiricalArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SatiricalArticleProps

export default SatiricalArticle
