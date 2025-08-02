import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"
import type { MedicalScholarlyArticleType } from "./MedicalScholarlyArticle/index.ts"

export type ScholarlyArticleType =
	| "ScholarlyArticle"
	| MedicalScholarlyArticleType

export interface ScholarlyArticleProps {
	"@type"?: ScholarlyArticleType
}

type ScholarlyArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& ScholarlyArticleProps

export default ScholarlyArticle
