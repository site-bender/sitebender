import type BaseProps from "../../../../types/index.ts"
import type { DataFeedItem as DataFeedItemProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = DataFeedItemProps & BaseProps

export default function DataFeedItem({
	_type = "DataFeedItem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
