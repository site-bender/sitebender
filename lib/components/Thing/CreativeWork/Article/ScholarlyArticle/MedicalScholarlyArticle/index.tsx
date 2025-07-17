import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalScholarlyArticleProps from "../../../../../../types/Thing/MedicalScholarlyArticle/index.ts"
import type ScholarlyArticleProps from "../../../../../../types/Thing/ScholarlyArticle/index.ts"

import ScholarlyArticle from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalScholarlyArticleProps,
	"MedicalScholarlyArticle",
	ExtractLevelProps<MedicalScholarlyArticleProps, ScholarlyArticleProps>
>

export default function MedicalScholarlyArticle(
	{
		publicationType,
		schemaType = "MedicalScholarlyArticle",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ScholarlyArticle
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				publicationType,
				...subtypeProperties,
			}}
		/>
	)
}
