import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export type AdvertiserContentArticleType = "AdvertiserContentArticle"

export interface AdvertiserContentArticleProps {
	"@type"?: AdvertiserContentArticleType
}

type AdvertiserContentArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& AdvertiserContentArticleProps

export default AdvertiserContentArticle
