import type BaseProps from "../../../../../../types/index.ts"
import type { Locksmith as LocksmithProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = LocksmithProps & BaseProps

export default function Locksmith({
	_type = "Locksmith",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
