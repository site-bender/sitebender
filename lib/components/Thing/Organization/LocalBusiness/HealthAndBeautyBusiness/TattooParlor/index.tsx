import type BaseProps from "../../../../../../types/index.ts"
import type { TattooParlor as TattooParlorProps } from "../../../../../../types/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = TattooParlorProps & BaseProps

export default function TattooParlor({
	_type = "TattooParlor",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
