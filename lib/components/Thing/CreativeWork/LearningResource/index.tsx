import type BaseProps from "../../../../types/index.ts"
import type { LearningResource as LearningResourceProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = LearningResourceProps & BaseProps

export default function LearningResource({
	_type = "LearningResource",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
