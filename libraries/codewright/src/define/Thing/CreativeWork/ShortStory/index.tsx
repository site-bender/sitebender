import type BaseProps from "../../../../../types/index.ts"
import type { ShortStory as ShortStoryProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ShortStoryProps & BaseProps

export default function ShortStory({
	_type = "ShortStory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
