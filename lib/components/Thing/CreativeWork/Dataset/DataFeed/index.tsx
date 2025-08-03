import type BaseProps from "../../../../../types/index.ts"
import type { DataFeed as DataFeedProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DataFeedProps & BaseProps

export default function DataFeed({
	_type = "DataFeed",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
