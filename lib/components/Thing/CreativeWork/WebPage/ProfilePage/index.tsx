import type BaseProps from "../../../../../types/index.ts"
import type { ProfilePage as ProfilePageProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ProfilePageProps & BaseProps

export default function ProfilePage({
	_type = "ProfilePage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
