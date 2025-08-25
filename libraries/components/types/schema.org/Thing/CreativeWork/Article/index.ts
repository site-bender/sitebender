import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type SpeakableSpecification from "../../Intangible/SpeakableSpecification/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { AdvertiserContentArticleType } from "./AdvertiserContentArticle/index.ts"
import type { NewsArticleType } from "./NewsArticle/index.ts"
import type { ReportType } from "./Report/index.ts"
import type { SatiricalArticleType } from "./SatiricalArticle/index.ts"
import type { ScholarlyArticleType } from "./ScholarlyArticle/index.ts"
import type { SocialMediaPostingType } from "./SocialMediaPosting/index.ts"
import type { TechArticleType } from "./TechArticle/index.ts"

import { CreativeWork as CreativeWorkComponent } from "../../../../../components/index.tsx"
import { SpeakableSpecification as SpeakableSpecificationComponent } from "../../../../../components/index.tsx"

export type ArticleType =
	| "Article"
	| AdvertiserContentArticleType
	| SatiricalArticleType
	| ScholarlyArticleType
	| SocialMediaPostingType
	| ReportType
	| NewsArticleType
	| TechArticleType

export interface ArticleProps {
	"@type"?: ArticleType
	articleBody?: Text
	articleSection?: Text
	backstory?: CreativeWork | Text | ReturnType<typeof CreativeWorkComponent>
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
	speakable?:
		| SpeakableSpecification
		| URL
		| ReturnType<typeof SpeakableSpecificationComponent>
	wordCount?: Integer
}

type Article = Thing & CreativeWorkProps & ArticleProps

export default Article
