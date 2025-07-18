import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type GuideProps from "../../../../types/Thing/Guide/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	GuideProps,
	"Guide",
	ExtractLevelProps<GuideProps, CreativeWorkProps>
>

export default function Guide(
	{
		reviewAspect,
		schemaType = "Guide",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				reviewAspect,
				...subtypeProperties,
			}}
		/>
	)
}
