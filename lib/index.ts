// @sitebender/metadata-components
// Convenience exports for all metadata components

// Creative Works
export { default as CreativeWork } from "./metadata/Thing/CreativeWork/index.tsx"
export { default as Article } from "./metadata/Thing/CreativeWork/Article/index.tsx"
export { default as Book } from "./metadata/Thing/CreativeWork/Book/index.tsx"
export { default as Movie } from "./metadata/Thing/CreativeWork/Movie/index.tsx"
export { default as WebSite } from "./metadata/Thing/CreativeWork/WebSite/index.tsx"
export { default as WebPage } from "./metadata/Thing/CreativeWork/WebPage/index.tsx"
export { default as Product } from "./metadata/Thing/CreativeWork/Product/index.tsx"
export { default as Review } from "./metadata/Thing/CreativeWork/Review/index.tsx"
export { default as LocalBusiness } from "./metadata/Thing/CreativeWork/LocalBusiness/index.tsx"

// Cultural
export { default as MentionedTerm } from "./metadata/cultural/MentionedTerm/index.tsx"
export { default as VesselName } from "./metadata/cultural/VesselName/index.tsx"

// Emotional
export { default as AltVoice } from "./metadata/emotional/AltVoice/index.tsx"
export { default as Emotion } from "./metadata/emotional/Emotion/index.tsx"

// Emphasis
export { default as KeyTerm } from "./metadata/emphasis/KeyTerm/index.tsx"
export { default as ProductName } from "./metadata/emphasis/ProductName/index.tsx"

// Narrative
export { default as DreamText } from "./metadata/narrative/DreamText/index.tsx"
export { default as InternalMonologue } from "./metadata/narrative/InternalMonologue/index.tsx"
export { default as StageDirection } from "./metadata/narrative/StageDirection/index.tsx"
export { default as ThoughtText } from "./metadata/narrative/ThoughtText/index.tsx"

// Quotations
export { default as CitedQuote } from "./metadata/quotations/CitedQuote/index.tsx"
export { default as Dialogue } from "./metadata/quotations/Dialogue/index.tsx"
export { default as IronicQuote } from "./metadata/quotations/IronicQuote/index.tsx"

// Scientific
export { default as BiologicalSeq } from "./metadata/scientific/BiologicalSeq/index.tsx"
export { default as LegalRef } from "./metadata/scientific/LegalRef/index.tsx"
export { default as MathVar } from "./metadata/scientific/MathVar/index.tsx"
export { default as TaxonomicName } from "./metadata/scientific/TaxonomicName/index.tsx"
export { default as TechnicalTerm } from "./metadata/scientific/TechnicalTerm/index.tsx"

// Textual
export { default as ForeignTerm } from "./metadata/textual/ForeignTerm/index.tsx"
export { default as IdiomaticPhrase } from "./metadata/textual/IdiomaticPhrase/index.tsx"
export { default as Letter } from "./metadata/textual/Letter/index.tsx"
export { default as Transliterated } from "./metadata/textual/Transliterated/index.tsx"
export { default as WordAsWord } from "./metadata/textual/WordAsWord/index.tsx"

// Thing base component
export { default as Thing } from "./metadata/Thing/index.tsx"

// Thing subtypes (Organization, Person)
export { default as Organization } from "./metadata/Thing/Organization/index.tsx"
export { default as Person } from "./metadata/Thing/Person/index.tsx"

// Types (commonly used by consumers)
export type { BCP47LanguageTag } from "./metadata/types/bcp47/index.ts"
export type {
	BookProps,
	CreativeWorkProps,
	TranslationCollection,
} from "./metadata/types/index.ts"
export type { SchemaOverride } from "./metadata/Thing/CreativeWork/index.tsx"
