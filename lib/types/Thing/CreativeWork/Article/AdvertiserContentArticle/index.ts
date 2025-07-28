import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface AdvertiserContentArticleProps {}

type AdvertiserContentArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& AdvertiserContentArticleProps

export default AdvertiserContentArticle
