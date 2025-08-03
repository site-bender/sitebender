import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalScholarlyArticle as MedicalScholarlyArticleProps } from "../../../../../../types/index.ts"

import ScholarlyArticle from "../index.tsx"

export type Props = MedicalScholarlyArticleProps & BaseProps

export default function MedicalScholarlyArticle({
	_type = "MedicalScholarlyArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
