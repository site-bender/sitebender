import type BaseProps from "../../../../../types/index.ts"
import type ComicIssueProps from "../../../../../types/Thing/CreativeWork/PublicationIssue/ComicIssue/index.ts"

import PublicationIssue from "../index.tsx"

export type Props = ComicIssueProps & BaseProps

export default function ComicIssue({
	artist,
	colorist,
	inker,
	letterer,
	penciler,
	variantCover,
	_type = "ComicIssue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PublicationIssue
			{...props}
			_type={_type}
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
