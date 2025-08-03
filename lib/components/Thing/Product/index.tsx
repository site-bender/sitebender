import type BaseProps from "../../../types/index.ts"
import type { Product as ProductProps } from "../../../types/index.ts"

import Thing from "../index.tsx"

export type Props = ProductProps & BaseProps

export default function Product({
	_type = "Product",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
