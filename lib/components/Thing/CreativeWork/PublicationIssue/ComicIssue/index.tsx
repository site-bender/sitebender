import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ComicIssueProps from "../../../../../types/Thing/ComicIssue/index.ts"
import type PublicationIssueProps from "../../../../../types/Thing/PublicationIssue/index.ts"

import PublicationIssue from "./index.tsx"

export type Props = BaseComponentProps<
	ComicIssueProps,
	"ComicIssue",
	ExtractLevelProps<ComicIssueProps, PublicationIssueProps>
>

export default function ComicIssue(
	{
		artist,
		colorist,
		inker,
		letterer,
		penciler,
		variantCover,
		schemaType = "ComicIssue",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<PublicationIssue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				artist,
				colorist,
				inker,
				letterer,
				penciler,
				variantCover,
				...subtypeProperties,
			}}
		/>
	)
}
