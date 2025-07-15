import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type BrandProps from "../../../../types/Thing/Brand/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	BrandProps,
	"Brand",
	ExtractLevelProps<BrandProps, IntangibleProps>
>

export default function Brand(
	{
		aggregateRating,
		logo,
		review,
		slogan,
		schemaType = "Brand",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				aggregateRating,
				logo,
				review,
				slogan,
				...subtypeProperties,
			}}
		/>
	)
}
