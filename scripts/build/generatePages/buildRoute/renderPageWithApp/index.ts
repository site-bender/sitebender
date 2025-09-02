import renderToString from "./renderToString/index.ts"

export type PageComponent = () => JSX.Element
export type HeadComponent = () => JSX.Element

/**
 * Renders a page component wrapped in the App layout
 */
export async function renderPageWithApp(
	PageComponent: PageComponent,
	HeadComponent?: HeadComponent,
	assets: string[] = [],
): Promise<string> {
	try {
		// Dynamic import to avoid circular dependency issues
		const appModule = await import("../../../../../docs/sites/DocsSite/index.tsx")
		const App = appModule.default as unknown as (
			props: {
				Component: PageComponent
				Head?: HeadComponent
				assets?: string[]
			},
		) => JSX.Element

		const appElement = App({
			Component: PageComponent,
			Head: HeadComponent,
			assets,
		})

		const html = renderToString(appElement)

		return `<!DOCTYPE html>${html}`
	} catch (error) {
		console.error("❌ Error in renderPageWithApp:", error)
		// Fallback: render page without wrapper
		return `<!DOCTYPE html>${renderToString(PageComponent())}`
	}
}

export default renderPageWithApp
