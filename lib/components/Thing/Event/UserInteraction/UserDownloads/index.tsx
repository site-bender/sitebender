import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserDownloadsProps from "../../../../../types/Thing/UserDownloads/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"

import UserInteraction from "../index.tsx"

// UserDownloads adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserDownloadsProps,
	"UserDownloads",
	ExtractLevelProps<UserDownloadsProps, UserInteractionProps>
>

export default function UserDownloads({
	schemaType = "UserDownloads",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<UserInteraction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
