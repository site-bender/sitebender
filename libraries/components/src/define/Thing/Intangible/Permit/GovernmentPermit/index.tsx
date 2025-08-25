import type BaseProps from "../../../../../../types/index.ts"
import type { GovernmentPermit as GovernmentPermitProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GovernmentPermitProps & BaseProps

export default function GovernmentPermit({
	_type = "GovernmentPermit",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
