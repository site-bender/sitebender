import type BaseProps from "../../../../../types/index.ts"
import type { MedicalGuidelineRecommendation as MedicalGuidelineRecommendationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalGuidelineRecommendationProps & BaseProps

export default function MedicalGuidelineRecommendation({
	_type = "MedicalGuidelineRecommendation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
