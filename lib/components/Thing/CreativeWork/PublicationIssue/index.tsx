import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type PublicationIssueProps from "../../../../types/Thing/PublicationIssue/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	PublicationIssueProps,
	"PublicationIssue",
	ExtractLevelProps<PublicationIssueProps, CreativeWorkProps>
>

export default function PublicationIssue(
	{
		issueNumber,
		pageEnd,
		pageStart,
		pagination,
		schemaType = "PublicationIssue",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				issueNumber,
				pageEnd,
				pageStart,
				pagination,
				...subtypeProperties,
			}}
		/>
	)
}
