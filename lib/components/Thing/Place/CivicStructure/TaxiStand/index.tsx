import type BaseProps from "../../../../../types/index.ts"
import type { TaxiStand as TaxiStandProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = TaxiStandProps & BaseProps

export default function TaxiStand({
	_type = "TaxiStand",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
