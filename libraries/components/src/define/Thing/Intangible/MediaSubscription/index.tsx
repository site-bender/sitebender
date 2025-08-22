import type BaseProps from "../../../../types/index.ts"
import type { MediaSubscription as MediaSubscriptionProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MediaSubscriptionProps & BaseProps

export default function MediaSubscription({
	_type = "MediaSubscription",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
