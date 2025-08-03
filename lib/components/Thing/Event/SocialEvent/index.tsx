import type BaseProps from "../../../../types/index.ts"
import type { SocialEvent as SocialEventProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SocialEventProps & BaseProps

export default function SocialEvent({
	_type = "SocialEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
