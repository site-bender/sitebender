import type BaseProps from "../../../../../../types/index.ts"
import type { Florist as FloristProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = FloristProps & BaseProps

export default function Florist({
	_type = "Florist",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
