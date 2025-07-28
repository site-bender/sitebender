import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../../types/Thing/CreativeWork/index.ts"
import type { ArticleProps } from "../../../../../../types/Thing/CreativeWork/Article/index.ts"
import type { ScholarlyArticleProps } from "../../../../../../types/Thing/CreativeWork/Article/ScholarlyArticle/index.ts"
import type { MedicalScholarlyArticleProps } from "../../../../../../types/Thing/CreativeWork/Article/ScholarlyArticle/MedicalScholarlyArticle/index.ts"

import ScholarlyArticle from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalScholarlyArticleProps,
	"MedicalScholarlyArticle",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ArticleProps, ScholarlyArticleProps>
>

export default function MedicalScholarlyArticle({
	publicationType,
	schemaType = "MedicalScholarlyArticle",
	subtypeProperties = {},
	...props
}): Props {
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
