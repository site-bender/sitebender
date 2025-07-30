import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { ScholarlyArticleProps } from "../index.ts"

export interface MedicalScholarlyArticleProps {
	"@type"?: "MedicalScholarlyArticle"
	publicationType?: Text
}

type MedicalScholarlyArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& ScholarlyArticleProps
	& MedicalScholarlyArticleProps

export default MedicalScholarlyArticle
