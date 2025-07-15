import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"
import type UserPlusOnesProps from "../../../../../types/Thing/UserPlusOnes/index.ts"

import UserInteraction from "./index.tsx"

// UserPlusOnes adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserPlusOnesProps,
	"UserPlusOnes",
	ExtractLevelProps<UserPlusOnesProps, UserInteractionProps>
>

export default function UserPlusOnes({
	schemaType = "UserPlusOnes",
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
