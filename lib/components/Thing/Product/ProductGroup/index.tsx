import type BaseProps from "../../../../types/index.ts"
import type { ProductGroup as ProductGroupProps } from "../../../../types/index.ts"

import Product from "../index.tsx"

export type Props = ProductGroupProps & BaseProps

export default function ProductGroup({
	_type = "ProductGroup",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
