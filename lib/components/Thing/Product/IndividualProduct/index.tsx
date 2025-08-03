import type BaseProps from "../../../../types/index.ts"
import type { IndividualProduct as IndividualProductProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = IndividualProductProps & BaseProps

export default function IndividualProduct({
	_type = "IndividualProduct",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
