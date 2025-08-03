import type BaseProps from "../../../../../../types/index.ts"
import type { TennisComplex as TennisComplexProps } from "../../../../../../types/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = TennisComplexProps & BaseProps

export default function TennisComplex({
	_type = "TennisComplex",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
