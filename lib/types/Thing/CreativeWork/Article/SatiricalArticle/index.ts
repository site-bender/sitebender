import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export type SatiricalArticleType = "SatiricalArticle"

export interface SatiricalArticleProps {
	"@type"?: SatiricalArticleType
}

type SatiricalArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SatiricalArticleProps

export default SatiricalArticle
