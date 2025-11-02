import type BaseProps from "../../../../../types/index.ts"
import type { MemberProgram as MemberProgramProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MemberProgramProps & BaseProps

export default function MemberProgram({
	_type = "MemberProgram",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
