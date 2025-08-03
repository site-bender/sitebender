import type BaseProps from "../../../../../../types/index.ts"
import type { PostOffice as PostOfficeProps } from "../../../../../../types/index.ts"

import GovernmentOffice from "../index.tsx"

export type Props = PostOfficeProps & BaseProps

export default function PostOffice({
	_type = "PostOffice",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
