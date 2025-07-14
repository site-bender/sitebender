# BCP-47 Language Codes Reference

This document provides a comprehensive list of BCP-47 language tags for use with the `lang` attribute in metadata components.

## What is BCP-47?

BCP-47 (Best Current Practice 47) is the standard for identifying languages on the web. It's used in HTML `lang` attributes to help screen readers, search engines, and translation tools understand the language of content.

## Format

BCP-47 tags follow the pattern: `language-[script]-[region]-[variant]`

Examples:

- `en` - English
- `en-US` - English (United States)
- `zh-Hans` - Chinese (Simplified script)
- `zh-Hans-CN` - Chinese (Simplified, China)

## Common Language Codes

| Language      | Code | Notes                       |
| ------------- | ---- | --------------------------- |
| Afrikaans     | `af` |                             |
| Albanian      | `sq` |                             |
| Amharic       | `am` |                             |
| Arabic        | `ar` | See regional variants below |
| Armenian      | `hy` |                             |
| Azerbaijani   | `az` |                             |
| Basque        | `eu` |                             |
| Belarusian    | `be` |                             |
| Bengali       | `bn` |                             |
| Bosnian       | `bs` |                             |
| Bulgarian     | `bg` |                             |
| Burmese       | `my` |                             |
| Catalan       | `ca` |                             |
| Chinese       | `zh` | See script variants below   |
| Croatian      | `hr` |                             |
| Czech         | `cs` |                             |
| Danish        | `da` |                             |
| Dutch         | `nl` |                             |
| English       | `en` | See regional variants below |
| Estonian      | `et` |                             |
| Finnish       | `fi` |                             |
| French        | `fr` | See regional variants below |
| Galician      | `gl` |                             |
| Georgian      | `ka` |                             |
| German        | `de` | See regional variants below |
| Greek         | `el` |                             |
| Gujarati      | `gu` |                             |
| Hebrew        | `he` |                             |
| Hindi         | `hi` |                             |
| Hungarian     | `hu` |                             |
| Icelandic     | `is` |                             |
| Indonesian    | `id` |                             |
| Irish         | `ga` |                             |
| Italian       | `it` |                             |
| Japanese      | `ja` |                             |
| Kannada       | `kn` |                             |
| Kazakh        | `kk` |                             |
| Khmer         | `km` |                             |
| Korean        | `ko` |                             |
| Kurdish       | `ku` |                             |
| Kyrgyz        | `ky` |                             |
| Lao           | `lo` |                             |
| Latin         | `la` | For historical texts        |
| Latvian       | `lv` |                             |
| Lithuanian    | `lt` |                             |
| Macedonian    | `mk` |                             |
| Malay         | `ms` |                             |
| Malayalam     | `ml` |                             |
| Maltese       | `mt` |                             |
| Marathi       | `mr` |                             |
| Mongolian     | `mn` |                             |
| Nepali        | `ne` |                             |
| Norwegian     | `no` | See variants below          |
| Pashto        | `ps` |                             |
| Persian/Farsi | `fa` |                             |
| Polish        | `pl` |                             |
| Portuguese    | `pt` | See regional variants below |
| Punjabi       | `pa` |                             |
| Romanian      | `ro` |                             |
| Russian       | `ru` |                             |
| Serbian       | `sr` |                             |
| Sinhala       | `si` |                             |
| Slovak        | `sk` |                             |
| Slovenian     | `sl` |                             |
| Spanish       | `es` | See regional variants below |
| Swahili       | `sw` |                             |
| Swedish       | `sv` |                             |
| Tamil         | `ta` |                             |
| Telugu        | `te` |                             |
| Thai          | `th` |                             |
| Turkish       | `tr` |                             |
| Ukrainian     | `uk` |                             |
| Urdu          | `ur` |                             |
| Uzbek         | `uz` |                             |
| Vietnamese    | `vi` |                             |
| Welsh         | `cy` |                             |
| Yiddish       | `yi` |                             |

## Regional Variants

### English

| Variant                | Code    | Region         |
| ---------------------- | ------- | -------------- |
| English (US)           | `en-US` | United States  |
| English (UK)           | `en-GB` | United Kingdom |
| English (Canada)       | `en-CA` | Canada         |
| English (Australia)    | `en-AU` | Australia      |
| English (New Zealand)  | `en-NZ` | New Zealand    |
| English (South Africa) | `en-ZA` | South Africa   |
| English (India)        | `en-IN` | India          |

### Spanish

| Variant             | Code    | Region    |
| ------------------- | ------- | --------- |
| Spanish (Spain)     | `es-ES` | Spain     |
| Spanish (Mexico)    | `es-MX` | Mexico    |
| Spanish (Argentina) | `es-AR` | Argentina |
| Spanish (Colombia)  | `es-CO` | Colombia  |
| Spanish (Chile)     | `es-CL` | Chile     |
| Spanish (Peru)      | `es-PE` | Peru      |
| Spanish (Venezuela) | `es-VE` | Venezuela |

### French

| Variant              | Code    | Region      |
| -------------------- | ------- | ----------- |
| French (France)      | `fr-FR` | France      |
| French (Canada)      | `fr-CA` | Canada      |
| French (Belgium)     | `fr-BE` | Belgium     |
| French (Switzerland) | `fr-CH` | Switzerland |

### German

| Variant              | Code    | Region      |
| -------------------- | ------- | ----------- |
| German (Germany)     | `de-DE` | Germany     |
| German (Austria)     | `de-AT` | Austria     |
| German (Switzerland) | `de-CH` | Switzerland |

### Portuguese

| Variant               | Code    | Region   |
| --------------------- | ------- | -------- |
| Portuguese (Brazil)   | `pt-BR` | Brazil   |
| Portuguese (Portugal) | `pt-PT` | Portugal |

### Arabic

| Variant               | Code    | Region               |
| --------------------- | ------- | -------------------- |
| Arabic (Saudi Arabia) | `ar-SA` | Saudi Arabia         |
| Arabic (Egypt)        | `ar-EG` | Egypt                |
| Arabic (UAE)          | `ar-AE` | United Arab Emirates |
| Arabic (Morocco)      | `ar-MA` | Morocco              |
| Arabic (Lebanon)      | `ar-LB` | Lebanon              |

### Chinese

| Variant               | Code      | Script/Region      |
| --------------------- | --------- | ------------------ |
| Chinese (Simplified)  | `zh-Hans` | Simplified script  |
| Chinese (Traditional) | `zh-Hant` | Traditional script |
| Chinese (Mainland)    | `zh-CN`   | China              |
| Chinese (Taiwan)      | `zh-TW`   | Taiwan             |
| Chinese (Hong Kong)   | `zh-HK`   | Hong Kong          |
| Chinese (Singapore)   | `zh-SG`   | Singapore          |

### Norwegian

| Variant             | Code | Notes                      |
| ------------------- | ---- | -------------------------- |
| Norwegian Bokmål    | `nb` | Most common written form   |
| Norwegian Nynorsk   | `nn` | Alternative written form   |
| Norwegian (generic) | `no` | When specific form unknown |

## Script Variants

For languages with multiple writing systems:

| Language  | Script      | Code      | Example |
| --------- | ----------- | --------- | ------- |
| Serbian   | Cyrillic    | `sr-Cyrl` | српски  |
| Serbian   | Latin       | `sr-Latn` | srpski  |
| Uzbek     | Cyrillic    | `uz-Cyrl` | ўзбек   |
| Uzbek     | Latin       | `uz-Latn` | oʻzbek  |
| Mongolian | Cyrillic    | `mn-Cyrl` | монгол  |
| Mongolian | Traditional | `mn-Mong` | ᠮᠣᠩᠭᠣᠯ  |

## Usage in Components

Use these codes with the `lang` attribute in metadata components:

```tsx
<ForeignTerm lang="ja" title="empty hand">
  空手
</ForeignTerm>

<IdiomaticPhrase lang="fr" title="reason for existence">
  raison d'être
</IdiomaticPhrase>

<WordAsWord lang="de" partOfSpeech="noun">
  Schadenfreude
</WordAsWord>
```

## Resources

- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
- [RFC 5646: Tags for Identifying Languages](https://tools.ietf.org/html/rfc5646)
- [W3C Language Tags in HTML](https://www.w3.org/International/articles/language-tags/)
