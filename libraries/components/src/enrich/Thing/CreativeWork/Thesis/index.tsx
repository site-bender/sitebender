import type BaseProps from "../../../../types/index.ts"
import type { Thesis as ThesisProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ThesisProps & BaseProps

export default function Thesis({
	_type = "Thesis",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
