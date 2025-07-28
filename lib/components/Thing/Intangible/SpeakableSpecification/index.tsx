import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { SpeakableSpecificationProps } from "../../../../types/Thing/Intangible/SpeakableSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	SpeakableSpecificationProps,
	"SpeakableSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function SpeakableSpecification({
	cssSelector,
	xpath,
	schemaType = "SpeakableSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				cssSelector,
				xpath,
				...subtypeProperties,
			}}
		/>
	)
}
