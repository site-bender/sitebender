import type BaseProps from "../../../../../types/index.ts"
import type { Answer as AnswerProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AnswerProps & BaseProps

export default function Answer({
	_type = "Answer",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
