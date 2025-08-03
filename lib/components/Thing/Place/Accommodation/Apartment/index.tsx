import type BaseProps from "../../../../../types/index.ts"
import type { Apartment as ApartmentProps } from "../../../../../types/index.ts"

import Accommodation from "../index.tsx"

export type Props = ApartmentProps & BaseProps

export default function Apartment({
	_type = "Apartment",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
