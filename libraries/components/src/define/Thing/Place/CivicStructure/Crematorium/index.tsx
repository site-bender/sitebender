import type BaseProps from "../../../../../types/index.ts"
import type { Crematorium as CrematoriumProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CrematoriumProps & BaseProps

export default function Crematorium({
	_type = "Crematorium",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
