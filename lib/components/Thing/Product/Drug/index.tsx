import type BaseProps from "../../../../types/index.ts"
import type { Drug as DrugProps } from "../../../../types/index.ts"

import Product from "../index.tsx"

export type Props = DrugProps & BaseProps

export default function Drug({
	_type = "Drug",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
