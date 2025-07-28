import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalScholarlyArticleProps } from "../../../../../../types/Thing/CreativeWork/Article/ScholarlyArticle/MedicalScholarlyArticle/index.ts"

import ScholarlyArticle from "../index.tsx"

export type Props = MedicalScholarlyArticleProps & BaseProps

export default function MedicalScholarlyArticle({
	publicationType,
	_type = "MedicalScholarlyArticle",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ScholarlyArticle
			{...props}
			_type={_type}
			subtypeProperties={{
				publicationType,
				...subtypeProperties,
			}}
		/>
	)
}
