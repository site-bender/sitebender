import type BaseProps from "../../../../../../types/index.ts"
import type { Mosque as MosqueProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MosqueProps & BaseProps

export default function Mosque({
	_type = "Mosque",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
