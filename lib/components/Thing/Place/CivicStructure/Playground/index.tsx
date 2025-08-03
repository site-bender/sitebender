import type BaseProps from "../../../../../types/index.ts"
import type { Playground as PlaygroundProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PlaygroundProps & BaseProps

export default function Playground({
	_type = "Playground",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
