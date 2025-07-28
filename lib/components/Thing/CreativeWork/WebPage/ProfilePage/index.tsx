import type BaseProps from "../../../../../types/index.ts"
import type { ProfilePageProps } from "../../../../../types/Thing/CreativeWork/WebPage/ProfilePage/index.ts"

import WebPage from "../index.tsx"

export type Props = ProfilePageProps & BaseProps

export default function ProfilePage({
	_type = "ProfilePage",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPage
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
