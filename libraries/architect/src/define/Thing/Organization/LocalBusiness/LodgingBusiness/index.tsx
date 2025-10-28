import type BaseProps from "../../../../../../types/index.ts"
import type { LodgingBusiness as LodgingBusinessProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = LodgingBusinessProps & BaseProps

export default function LodgingBusiness({
	_type = "LodgingBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
