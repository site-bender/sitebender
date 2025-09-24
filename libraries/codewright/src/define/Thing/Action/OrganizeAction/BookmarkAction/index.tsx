import type BaseProps from "../../../../../../types/index.ts"
import type { BookmarkAction as BookmarkActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BookmarkActionProps & BaseProps

export default function BookmarkAction({
	_type = "BookmarkAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
