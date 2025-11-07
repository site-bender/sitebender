import type BaseProps from "../../../../../../types/index.ts"
import type { LinkRole as LinkRoleProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = LinkRoleProps & BaseProps

export default function LinkRole({
	_type = "LinkRole",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
