import createElement from "../../.sitebender/createElement/index.ts"
import Fragment from "../../.sitebender/Fragment/index.ts"
import createAssetElements from "../../.sitebender/scripts/build/createAssetElements/index.tsx"

// Set up JSX runtime
Object.assign(globalThis, { createElement, Fragment })

export type Props = {
	Component: () => JSX.Element
	Head?: () => JSX.Element
	assets?: Array<string>
}

export default function App({ Component, Head, assets = [] }: Props) {
	const assetElements = createAssetElements(assets)

	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				{/* Shared styles - used by both legacy and modern approaches */}
				<link rel="stylesheet" href="/styles/reset/index.css" />
				<link rel="stylesheet" href="/styles/site.css" />
				{assetElements}
				{Head && <Head />}
			</head>
			<body>
				<Component />
			</body>
		</html>
	)
}
