import type BaseProps from "../../../../../types/index.ts"
import type { Chapter as ChapterProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ChapterProps & BaseProps

export default function Chapter({
	_type = "Chapter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
