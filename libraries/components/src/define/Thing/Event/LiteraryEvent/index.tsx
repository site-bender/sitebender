import type BaseProps from "../../../../types/index.ts"
import type { LiteraryEvent as LiteraryEventProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = LiteraryEventProps & BaseProps

export default function LiteraryEvent({
	_type = "LiteraryEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
