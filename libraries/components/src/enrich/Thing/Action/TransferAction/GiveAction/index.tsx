import type BaseProps from "../../../../../types/index.ts"
import type { GiveAction as GiveActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GiveActionProps & BaseProps

export default function GiveAction({
	_type = "GiveAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
