import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { PublicationIssueProps } from "../../../../../types/Thing/CreativeWork/PublicationIssue/index.ts"
import type { ComicIssueProps } from "../../../../../types/Thing/CreativeWork/PublicationIssue/ComicIssue/index.ts"

import PublicationIssue from "../index.tsx"

export type Props = BaseComponentProps<
	ComicIssueProps,
	"ComicIssue",
	ExtractLevelProps<ThingProps, CreativeWorkProps, PublicationIssueProps>
>

export default function ComicIssue({
	artist,
	colorist,
	inker,
	letterer,
	penciler,
	variantCover,
	schemaType = "ComicIssue",
	subtypeProperties = {},
	...props
}): Props {
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
