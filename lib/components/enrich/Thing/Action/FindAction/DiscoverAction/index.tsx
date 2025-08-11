import type BaseProps from "../../../../../types/index.ts"
import type { DiscoverAction as DiscoverActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DiscoverActionProps & BaseProps

export default function DiscoverAction({
	_type = "DiscoverAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
