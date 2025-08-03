import type BaseProps from "../../../../types/index.ts"
import type { Statement as StatementProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = StatementProps & BaseProps

export default function Statement({
	_type = "Statement",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
