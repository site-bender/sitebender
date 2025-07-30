import type BaseProps from "../../../../types/index.ts"
import type SoftwareSourceCodeProps from "../../../../types/Thing/CreativeWork/SoftwareSourceCode/index.ts"

import CreativeWork from "../index.tsx"

export type Props = SoftwareSourceCodeProps & BaseProps

export default function SoftwareSourceCode({
	codeRepository,
	codeSampleType,
	programmingLanguage,
	runtime,
	runtimePlatform,
	sampleType,
	targetProduct,
	_type = "SoftwareSourceCode",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
		>{children}</CreativeWork>
	)
}
