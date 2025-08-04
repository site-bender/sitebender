import type BaseProps from "../../../../../types/index.ts"
import type { WorkBasedProgram as WorkBasedProgramProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = WorkBasedProgramProps & BaseProps

export default function WorkBasedProgram({
	_type = "WorkBasedProgram",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
