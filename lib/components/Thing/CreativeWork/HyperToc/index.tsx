import type BaseProps from "../../../../types/index.ts"
import type { HyperToc as HyperTocProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HyperTocProps & BaseProps

export default function HyperToc({
	_type = "HyperToc",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
