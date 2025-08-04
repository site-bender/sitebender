import type BaseProps from "../../../../types/index.ts"
import type { EntryPoint as EntryPointProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = EntryPointProps & BaseProps

export default function EntryPoint({
	_type = "EntryPoint",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
