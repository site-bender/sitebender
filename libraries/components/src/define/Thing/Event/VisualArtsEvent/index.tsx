import type BaseProps from "../../../../types/index.ts"
import type { VisualArtsEvent as VisualArtsEventProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = VisualArtsEventProps & BaseProps

export default function VisualArtsEvent({
	_type = "VisualArtsEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
