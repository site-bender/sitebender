import type BaseProps from "../../../../../../../../types/index.ts"
import type { RsvpAction as RsvpActionProps } from "../../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = RsvpActionProps & BaseProps

export default function RsvpAction({
	_type = "RsvpAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
