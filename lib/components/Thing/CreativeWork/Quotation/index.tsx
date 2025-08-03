import type BaseProps from "../../../../types/index.ts"
import type { Quotation as QuotationProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = QuotationProps & BaseProps

export default function Quotation({
	_type = "Quotation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
