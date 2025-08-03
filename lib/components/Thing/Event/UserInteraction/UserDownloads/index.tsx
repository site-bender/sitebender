import type BaseProps from "../../../../../types/index.ts"
import type { UserDownloads as UserDownloadsProps } from "../../../../../types/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserDownloadsProps & BaseProps

export default function UserDownloads({
	_type = "UserDownloads",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
