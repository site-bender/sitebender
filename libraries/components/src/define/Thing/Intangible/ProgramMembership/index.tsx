import type BaseProps from "../../../../../types/index.ts"
import type { ProgramMembership as ProgramMembershipProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ProgramMembershipProps & BaseProps

export default function ProgramMembership({
	_type = "ProgramMembership",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
