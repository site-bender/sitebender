import type BaseProps from "../../../../types/index.ts"
import type { Enumeration as EnumerationProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = EnumerationProps & BaseProps

export default function Enumeration({
	_type = "Enumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
