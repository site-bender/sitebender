import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { ScholarlyArticleProps } from "../index.ts"

export interface MedicalScholarlyArticleProps {
	/** The type of the medical article, taken from the US NLM MeSH publication type catalog. See also [MeSH documentation](http://www.nlm.nih.gov/mesh/pubtypes.html). */
	publicationType?: Text
}

type MedicalScholarlyArticle =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& ScholarlyArticleProps
	& MedicalScholarlyArticleProps

export default MedicalScholarlyArticle
