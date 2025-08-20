import type BaseProps from "../../../../../../types/index.ts"
import type { CompleteDataFeed as CompleteDataFeedProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CompleteDataFeedProps & BaseProps

export default function CompleteDataFeed({
	_type = "CompleteDataFeed",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
