import type BaseProps from "../../../../../../types/index.ts"
import type { MovingCompany as MovingCompanyProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MovingCompanyProps & BaseProps

export default function MovingCompany({
	_type = "MovingCompany",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
