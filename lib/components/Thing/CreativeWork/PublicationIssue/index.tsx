import type BaseProps from "../../../../types/index.ts"
import type { PublicationIssueProps } from "../../../../types/Thing/CreativeWork/PublicationIssue/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PublicationIssueProps & BaseProps

export default function PublicationIssue({
	issueNumber,
	pageEnd,
	pageStart,
	pagination,
	_type = "PublicationIssue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
