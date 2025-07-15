import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ProfilePageProps from "../../../../../types/Thing/ProfilePage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "./index.tsx"

// ProfilePage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	ProfilePageProps,
	"ProfilePage",
	ExtractLevelProps<ProfilePageProps, WebPageProps>
>

export default function ProfilePage({
	schemaType = "ProfilePage",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<WebPage
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
