import type BaseProps from "../../../../../../types/index.ts"
import type { Barcode as BarcodeProps } from "../../../../../../types/index.ts"

import ImageObject from "../index.tsx"

export type Props = BarcodeProps & BaseProps

export default function Barcode({
	_type = "Barcode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
