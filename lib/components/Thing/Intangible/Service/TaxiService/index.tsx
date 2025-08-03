import type BaseProps from "../../../../../types/index.ts"
import type { TaxiService as TaxiServiceProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TaxiServiceProps & BaseProps

export default function TaxiService({
	_type = "TaxiService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
