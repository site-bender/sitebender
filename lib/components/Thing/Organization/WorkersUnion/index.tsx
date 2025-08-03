import type BaseProps from "../../../../types/index.ts"
import type { WorkersUnion as WorkersUnionProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = WorkersUnionProps & BaseProps

export default function WorkersUnion({
	_type = "WorkersUnion",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
