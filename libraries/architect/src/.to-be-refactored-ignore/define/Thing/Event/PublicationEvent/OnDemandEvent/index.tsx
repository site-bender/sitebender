import type BaseProps from "../../../../../../types/index.ts"
import type { OnDemandEvent as OnDemandEventProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OnDemandEventProps & BaseProps

export default function OnDemandEvent({
	_type = "OnDemandEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
