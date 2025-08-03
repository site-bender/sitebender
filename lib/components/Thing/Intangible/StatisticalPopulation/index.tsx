import type BaseProps from "../../../../types/index.ts"
import type { StatisticalPopulation as StatisticalPopulationProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = StatisticalPopulationProps & BaseProps

export default function StatisticalPopulation({
	_type = "StatisticalPopulation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
