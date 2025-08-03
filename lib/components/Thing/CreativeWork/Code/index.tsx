import type BaseProps from "../../../../types/index.ts"
import type { Code as CodeProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CodeProps & BaseProps

export default function Code({
	_type = "Code",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
