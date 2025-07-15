import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BookmarkActionProps from "../../../../../types/Thing/BookmarkAction/index.ts"
import type OrganizeActionProps from "../../../../../types/Thing/OrganizeAction/index.ts"

import OrganizeAction from "./index.tsx"

// BookmarkAction adds no properties to the OrganizeAction schema type
export type Props = BaseComponentProps<
	BookmarkActionProps,
	"BookmarkAction",
	ExtractLevelProps<BookmarkActionProps, OrganizeActionProps>
>

export default function BookmarkAction({
	schemaType = "BookmarkAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<OrganizeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
