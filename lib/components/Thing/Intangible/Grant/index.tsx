import type BaseProps from "../../../../types/index.ts"
import type { Grant as GrantProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = GrantProps & BaseProps

export default function Grant({
	_type = "Grant",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
