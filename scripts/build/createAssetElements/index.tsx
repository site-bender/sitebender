import createElement from "~utilities/createElement/index.ts"

export default function createAssetElements(
	assets: Array<string> = [],
): Array<JSX.Element> {
	// Dedupe assets based on the asset path
	const uniqueAssets = Array.from(new Set(assets))

	return uniqueAssets
		.map((assetPath: string) => {
			// Handle different URL formats
			let pathname: string

			if (assetPath.startsWith("//")) {
				// Protocol-relative URL
				pathname = new URL("http:" + assetPath).pathname
			} else if (
				assetPath.startsWith("http://") ||
				assetPath.startsWith("https://")
			) {
				// Absolute URL
				pathname = new URL(assetPath).pathname
			} else {
				// Relative URL
				pathname = new URL(assetPath, "http://example.com").pathname
			}

			// Extract file extension from the pathname (ignore query params/fragments)
			const pathParts = pathname.split("/")
			const filename = pathParts[pathParts.length - 1]
			const dotIndex = filename.lastIndexOf(".")
			const extension = dotIndex >= 0 ? filename.substring(dotIndex) : ""

			if (extension === ".css") {
				return <link rel="stylesheet" href={assetPath} />
			} else if (extension === ".js") {
				return <script src={assetPath}></script>
			}
			return null
		})
		.filter(Boolean) as Array<JSX.Element>
}
