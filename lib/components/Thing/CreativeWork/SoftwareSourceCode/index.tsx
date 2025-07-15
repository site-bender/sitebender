import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type SoftwareSourceCodeProps from "../../../../types/Thing/SoftwareSourceCode/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	SoftwareSourceCodeProps,
	"SoftwareSourceCode",
	ExtractLevelProps<SoftwareSourceCodeProps, CreativeWorkProps>
>

export default function SoftwareSourceCode(
	{
		codeRepository,
		codeSampleType,
		programmingLanguage,
		runtime,
		runtimePlatform,
		sampleType,
		targetProduct,
		schemaType = "SoftwareSourceCode",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				codeRepository,
				codeSampleType,
				programmingLanguage,
				runtime,
				runtimePlatform,
				sampleType,
				targetProduct,
				...subtypeProperties,
			}}
		/>
	)
}
