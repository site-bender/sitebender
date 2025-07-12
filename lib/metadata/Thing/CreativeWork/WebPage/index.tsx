import type { CreativeWorkProps } from "../../types/index.ts"

import CreativeWork from "../index.tsx"

// WebPage-specific properties
export type WebPageProps = CreativeWorkProps & {
	title: string // Required title for WebPage
	children?: never // Prevent children - use explicit title prop
	// WebPage-specific properties
	breadcrumb?: string // BreadcrumbList as text
	speakable?: boolean // Speakable content for voice search
	lastReviewed?: string // Last review date
	isPartOf?: string // Parent website or section
	mainContentOfPage?: string // Main content description
	primaryImageOfPage?: string // Primary image URL
	significantLink?: string[] // Array of significant links
	// Basic CreativeWork properties commonly used on web pages
	url?: string
	description?: string
	author?: string
	publisher?: string
	datePublished?: string
	dateModified?: string
	inLanguage?: string
	// Standard component props
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string
}

export default function WebPage({
	title,
	breadcrumb,
	speakable,
	lastReviewed,
	isPartOf,
	mainContentOfPage,
	primaryImageOfPage,
	significantLink,
	url,
	description,
	author,
	publisher,
	datePublished,
	dateModified,
	inLanguage,
	itemProp,
	disableMicrodata = false,
	disableLinkedData = false,
	onError,
	class: additionalClass,
	id,
	style,
	...props
}: WebPageProps) {
	// Prepare additional properties for schema override
	const additionalProperties: Record<string, any> = {}

	if (breadcrumb) additionalProperties.breadcrumb = breadcrumb
	if (speakable !== undefined) additionalProperties.speakable = speakable
	if (lastReviewed) additionalProperties.lastReviewed = lastReviewed
	if (isPartOf) additionalProperties.isPartOf = isPartOf
	if (mainContentOfPage) {
		additionalProperties.mainContentOfPage = mainContentOfPage
	}
	if (primaryImageOfPage) {
		additionalProperties.primaryImageOfPage = primaryImageOfPage
	}
	if (significantLink) additionalProperties.significantLink = significantLink

	return (
		<CreativeWork
			title={title}
			url={url}
			description={description}
			author={author}
			publisher={publisher}
			datePublished={datePublished}
			dateModified={dateModified}
			inLanguage={inLanguage}
			itemProp={itemProp}
			disableMicrodata={disableMicrodata}
			disableLinkedData={disableLinkedData}
			onError={onError}
			class={additionalClass}
			id={id}
			style={style}
			schemaOverride={{
				type: "WebPage",
				additionalProperties,
			}}
			{...props}
		/>
	)
}
