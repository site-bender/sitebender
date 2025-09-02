import type BaseProps from "../../../../../types/index.ts"
import type { SomeProducts as SomeProductsProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SomeProductsProps & BaseProps

export default function SomeProducts({
	_type = "SomeProducts",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
