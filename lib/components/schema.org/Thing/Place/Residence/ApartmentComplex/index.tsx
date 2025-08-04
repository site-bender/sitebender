import type BaseProps from "../../../../../types/index.ts"
import type { ApartmentComplex as ApartmentComplexProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ApartmentComplexProps & BaseProps

export default function ApartmentComplex({
	_type = "ApartmentComplex",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
