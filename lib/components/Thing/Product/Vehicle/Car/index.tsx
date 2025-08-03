import type BaseProps from "../../../../../types/index.ts"
import type { Car as CarProps } from "../../../../../types/index.ts"

import Vehicle from "../index.tsx"

export type Props = CarProps & BaseProps

export default function Car({
	_type = "Car",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
