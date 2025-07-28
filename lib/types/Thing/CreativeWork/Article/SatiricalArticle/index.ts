import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

import SatiricalArticleComponent from "../../../../../../components/Thing/CreativeWork/Article/SatiricalArticle/index.tsx"

export interface SatiricalArticleProps {
}

type SatiricalArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SatiricalArticleProps

export default SatiricalArticle
