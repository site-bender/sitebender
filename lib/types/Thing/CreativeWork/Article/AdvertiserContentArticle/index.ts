import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

import AdvertiserContentArticleComponent from "../../../../../../components/Thing/CreativeWork/Article/AdvertiserContentArticle/index.tsx"

export interface AdvertiserContentArticleProps {
}

type AdvertiserContentArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& AdvertiserContentArticleProps

export default AdvertiserContentArticle
