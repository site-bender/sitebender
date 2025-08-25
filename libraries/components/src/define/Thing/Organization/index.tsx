import type BaseProps from "../../../../types/index.ts"
import type { Organization as OrganizationProps } from "../../../../types/index.ts"

import Base from "../../Base/index.tsx"

export type Props = OrganizationProps & BaseProps

export default function Organization({
	_type = "Organization",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
