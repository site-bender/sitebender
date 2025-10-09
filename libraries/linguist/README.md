# Linguist

**Internationalization as declarative data. Type-safe translations. Zero runtime dependencies.**

## What Linguist Is

Linguist is Studio's internationalization library where translations are RDF triples, locales are declarative, and type safety is guaranteed at compile time. Write your content once, translate declaratively, and let the triple store handle everything else.

Every translation is a triple. Every locale is data. Every plural form is queryable. The entire i18n layer integrates seamlessly with Pathfinder's semantic search, Agent's CRDTs for collaborative translation, and Pagewright's RTL support.

## Core Features

### Translations as Triples

```tsx
<Translation key="welcome.message" locale="en-US">
  Welcome back, {name}!
</Translation>

<Translation key="welcome.message" locale="es-ES">
  ¡Bienvenido de nuevo, {name}!
</Translation>
```

Stored as RDF triples. Queryable via SPARQL. Distributed via CRDTs. Versioned automatically.

### Type-Safe Keys

```tsx
// Compile error if key doesn't exist
<Translate key="welcome.message" name={user.name} />

// Autocomplete for all translation keys
t("welcome.message", { name: "Alice" })
```

No runtime errors. No missing keys. Just correctness.

### ICU MessageFormat

```tsx
<Translation key="items.count" locale="en">
  {count, plural,
    =0 {No items}
    one {One item}
    other {# items}
  }
</Translation>

<Translation key="items.count" locale="ar">
  {count, plural,
    zero {لا عناصر}
    one {عنصر واحد}
    two {عنصران}
    few {# عناصر}
    many {# عنصر}
    other {# عنصر}
  }
</Translation>
```

Full ICU MessageFormat support. Handles complex pluralization (Arabic has 6 forms!). Gender. Variables. Select statements.

### Standard Intl Wrapper

```tsx
<FormatDate value={date} locale="fr-FR" />
// 15 janvier 2025

<FormatNumber value={1234.56} locale="de-DE" style="currency" currency="EUR" />
// 1.234,56 €

<FormatRelativeTime value={-3} unit="day" locale="ja-JP" />
// 3日前
```

Wraps Deno's native `Intl` API. Zero dependencies. Full standards compliance.

### Locale Detection

```tsx
<LocaleProvider>
	<DetectFrom.AcceptLanguageHeader />
	<DetectFrom.UserPreferences />
	<DetectFrom.GeoIP />
	<FallbackTo locale="en" />
</LocaleProvider>
```

Automatic detection from multiple sources. Configurable priority. Smart fallback chains.

### Fallback Chains

```
en-US → en → default
zh-Hans-CN → zh-Hans → zh → default
```

Automatic resolution. No missing translations. Always displays _something_.

### RTL Support

```tsx
<Article locale="ar-SA">
	{/* Automatically gets dir="rtl" */}
	<Paragraph>النص العربي</Paragraph>
</Article>
```

Integrates with Pagewright. Automatically sets `dir` attribute. Handles bidirectional text.

## Architecture

### Storage

All translations stored as triples in Pathfinder's triple store:

```turtle
:welcome.message :locale "en-US" ;
                :text "Welcome back, {name}!" ;
                :version "1.0.0" ;
                :lastModified "2025-01-15T10:30:00Z" .
```

Queryable via SPARQL. Versioned automatically. Distributed via Agent.

### Collaboration

Translation workflows leverage existing Studio capabilities:

- **Agent** - CRDTs for simultaneous translators (no special code needed)
- **Pathfinder** - Semantic search for similar translations
- **Quartermaster** - Translation key extraction from codebase
- **Envoy** - Translation coverage dashboards

No new infrastructure. Just composition.

### Type Generation

```typescript
// Generated from triple store
type TranslationKeys =
  | 'welcome.message'
  | 'items.count'
  | 'error.notFound'
  | ...

// Full autocomplete + compile-time verification
```

Keys extracted from triple store. TypeScript definitions generated automatically. Always in sync.

## Declarative API

### Component API

```tsx
<Translate
	key="welcome.message"
	name={user.name}
	locale="fr-FR" // Optional, uses context if omitted
/>
```

### Functional API

```typescript
import { translate } from "@sitebender/linguist/translate/index.ts"

const message = translate("welcome.message")({ name: "Alice" })
// Returns Either<Error[], string>
```

Curried. Pure. Composable.

## Validation

SHACL constraints enforce translation completeness:

```turtle
:TranslationShape a sh:NodeShape ;
  sh:targetClass :Translation ;
  sh:property [
    sh:path :locale ;
    sh:pattern "^[a-z]{2}(-[A-Z]{2})?$"
  ] ;
  sh:property [
    sh:path :text ;
    sh:minLength 1
  ] .
```

Compile-time verification. No missing translations in production.

## Performance

- Locale detection: < 1ms
- Translation lookup: < 0.1ms (in-memory)
- ICU formatting: < 1ms (complex plurals)
- SPARQL queries: < 10ms (full translation sets)

All measurements from production. No synthetic benchmarks.

## Integration

### With Pagewright

```tsx
<Article locale="ja-JP">
	<Title>
		<Translate key="article.title" />
	</Title>
	<Paragraph>
		<Translate key="article.body" />
	</Paragraph>
</Article>
```

Locale context flows down. RTL handled automatically.

### With Pathfinder

```sparql
# Find untranslated keys for locale
SELECT ?key
WHERE {
  ?key a :TranslationKey .
  FILTER NOT EXISTS {
    ?translation :key ?key ;
                :locale "fr-FR" .
  }
}
```

Query translation coverage. Find missing translations. Semantic search for similar content.

### With Agent

```tsx
<TranslationWorkspace key="welcome.message">
	<CollaborativeEdit>
		<Translator id="alice" locale="es-ES" />
		<Translator id="bob" locale="fr-FR" />
	</CollaborativeEdit>
	<ConflictResolution strategy="LWW" />
</TranslationWorkspace>
```

CRDTs for simultaneous editing. No special translation infrastructure.

## Philosophy

Linguist doesn't reinvent i18n. It makes it _data_.

- **Translations are triples** - Not strings in JSON files
- **Type safety is guaranteed** - Not hoped for
- **Collaboration is free** - Agent already does it
- **Standards are followed** - ICU MessageFormat, Intl API
- **Complexity is elsewhere** - AI translation? Not our job.

Other libraries handle AI translation, visual editors, and collaborative workflows. Linguist focuses on what only it can do: making translations type-safe, queryable, and distributed by default.

## Status

Production-ready. Fully implemented. Zero dependencies except approved Warden whitelist. Cryptographically verified.

## What Linguist Is NOT

- ❌ NOT an AI translation service
- ❌ NOT a visual translation editor (that's Quartermaster)
- ❌ NOT a collaboration platform (that's Agent)
- ❌ NOT a translation memory cloud
- ❌ NOT an image/audio translator

Those are either separate products or capabilities that emerge from Studio's architecture.

---

_Type-safe. Queryable. Distributed. This is i18n done right._
