import type BaseProps from "../../../../../../types/index.ts"
import type { AuthorizeAction as AuthorizeActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AuthorizeActionProps & BaseProps

export default function AuthorizeAction({
	_type = "AuthorizeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
