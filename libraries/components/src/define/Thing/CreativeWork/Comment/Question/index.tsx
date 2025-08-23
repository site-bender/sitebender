import type BaseProps from "../../../../../types/index.ts"
import type { Question as QuestionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = QuestionProps & BaseProps

export default function Question({
	_type = "Question",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
