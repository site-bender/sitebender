// AdvertiserContentArticle extends Article but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AdvertiserContentArticleProps {}

type AdvertiserContentArticle =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& AdvertiserContentArticleProps

export default AdvertiserContentArticle
