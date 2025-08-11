# Component Implementation TODOs

## Overview
- **Total Components**: ~1315
- **Actually Implemented** (with export default): ~1191
- **False Positives** (JSDoc only, no implementation): ~91
- **Truly Empty Files**: 33
- **Total To Implement**: 124 existing files + many more planned

## Implementation Groups

### Group 1: Complete Empty Narrative Components (Priority: High)
Most of these files have JSDoc comments but no actual implementation (missing export default):

**Batch 1A - Character Components** (5 components):
- [ ] `identify/narrative/CharacterName` - Names of characters in fiction
- [ ] `identify/narrative/CharacterRelationship` - Relationships between characters
- [ ] `identify/narrative/CharacterRole` - Roles/archetypes (hero, villain, etc.)
- [ ] `identify/narrative/Protagonist` - Main character/hero
- [ ] `identify/narrative/Antagonist` - Opposing character/force
- [ ] `identify/narrative/SideCharacter` - Secondary characters

**Batch 1B - Story Structure** (6 components):
- [ ] `identify/narrative/Anecdote` - Short stories within narrative
- [ ] `identify/narrative/Backstory` - Background information
- [ ] `identify/narrative/Cliffhanger` - Suspenseful endings
- [ ] `identify/narrative/Exposition` - Background/context
- [ ] `identify/narrative/Flashback` - Past sequences
- [ ] `identify/narrative/Foreshadowing` - Hints about future events

**Batch 1C - Narrative Techniques** (6 components):
- [ ] `identify/narrative/Metafiction` - Self-referential narrative
- [ ] `identify/narrative/NonlinearNarrative` - Non-linear storytelling
- [ ] `identify/narrative/PointOfView` - Narrative perspective
- [ ] `identify/narrative/Setting` - Time and place description
- [ ] `identify/narrative/Symbolism` - Symbolic representations
- [ ] `identify/narrative/VoiceOver` - Narration/commentary

### Group 2: Complete Empty Scientific Components (Priority: High)
These files exist but lack implementation:

**Batch 2A - Chemical Components** (4 components):
- [ ] `identify/scientific/Compound` - Chemical compounds
- [ ] `identify/scientific/Element` - Chemical elements
- [ ] `identify/scientific/Formula` - Chemical/mathematical formulas
- [ ] `identify/scientific/Reaction` - Chemical reactions

**Batch 2B - Mathematical/Measurement** (3 components):
- [ ] `identify/scientific/Equation` - Mathematical equations (MathML support)
- [ ] `identify/scientific/Measurement` - Numeric measurements
- [ ] `identify/scientific/MeasurementUnit` - Units of measurement

### Group 3: Complete Empty Quotation Components (Priority: Medium)
- [ ] `identify/quotations/Narration` - Narrative text
- [ ] `identify/quotations/Paraphrase` - Reworded text
- [ ] `identify/quotations/Testimonial` - Endorsements

### Group 4: Complete Unimplemented Historical Components (Priority: High)
All 5 components have JSDoc but no implementation:
- [ ] `identify/historical/HistoricalEvent` - Historical events and periods
- [ ] `identify/historical/HistoricalFigure` - Historical persons
- [ ] `identify/historical/HistoricalPlace` - Historical locations
- [ ] `identify/historical/HistoricalReference` - Historical references
- [ ] `identify/historical/HistoricalTerm` - Historical terminology

### Group 5: Complete Unimplemented Cultural Components (Priority: High)
All 12 components have JSDoc but no implementation:
- [ ] `identify/cultural/Anachronism` - Chronologically misplaced elements
- [ ] `identify/cultural/Archaism` - Archaic terms
- [ ] `identify/cultural/Colloquialism` - Informal expressions
- [ ] `identify/cultural/Dialect` - Regional language variations
- [ ] `identify/cultural/FigurativeLanguage` - Metaphors and similes
- [ ] `identify/cultural/Holiday` - Cultural celebrations
- [ ] `identify/cultural/IdiomaticPhrase` - Idiomatic expressions
- [ ] `identify/cultural/MythologicalReference` - Mythological references
- [ ] `identify/cultural/Proverb` - Traditional sayings
- [ ] `identify/cultural/Slang` - Informal language
- [ ] `identify/cultural/Tradition` - Cultural practices
- [ ] `identify/cultural/VesselName` - Ship and vessel names

### Group 6: Core Interactive Components (Priority: High)
Many of these were moved from top-level folders but still need review/updates:

**Batch 4A - Form Components**:
- [ ] `interact/forms/Form` - Enhanced form wrapper
- [ ] `interact/forms/Input` - Text input with validation
- [ ] `interact/forms/Select` - Dropdown selection
- [ ] `interact/forms/Checkbox` - Checkbox input
- [ ] `interact/forms/RadioButton` - Radio button groups
- [ ] `interact/forms/TextArea` - Multi-line text input
- [ ] `interact/forms/FileInput` - File upload

**Batch 4B - Button Components**:
- [ ] `interact/buttons/Button` - Base button component
- [ ] `interact/buttons/SubmitButton` - Form submission
- [ ] `interact/buttons/ResetButton` - Form reset
- [ ] `interact/buttons/ToggleButton` - On/off state

### Group 5: Layout Components (Priority: Medium)
**Batch 5A - Page Regions**:
- [ ] `layout/regions/Header` - Page header
- [ ] `layout/regions/Footer` - Page footer
- [ ] `layout/regions/Main` - Main content area
- [ ] `layout/regions/Aside` - Sidebar content
- [ ] `layout/regions/Nav` - Navigation region

**Batch 5B - Containers**:
- [ ] `layout/containers/Container` - Content container
- [ ] `layout/containers/Grid` - CSS Grid wrapper
- [ ] `layout/containers/Flex` - Flexbox wrapper
- [ ] `layout/containers/Card` - Card component
- [ ] `layout/containers/Panel` - Panel container

### Group 6: Media Components (Priority: Medium)
- [ ] `media/images/Figure` - Figure with caption
- [ ] `media/images/ResponsiveImage` - Responsive images
- [ ] `media/audio/Audio` - Audio player wrapper
- [ ] `media/audio/Transcript` - Audio transcript
- [ ] `media/video/Video` - Video player wrapper
- [ ] `media/video/Captions` - Video captions
- [ ] `media/video/Subtitles` - Video subtitles

### Group 7: Dynamic UI Components (Priority: Low)
Progressive enhancement components:
- [ ] `interact/dynamic/Accordion` - Collapsible sections
- [ ] `interact/dynamic/Tab` - Tab navigation
- [ ] `interact/dynamic/Modal` - Modal dialogs
- [ ] `interact/dynamic/Dropdown` - Dropdown menus
- [ ] `interact/dynamic/Tooltip` - Hover tooltips

### Group 8: Additional Linguistic Components (Priority: Low)
New components to add:
- [ ] `identify/linguistic/Etymology` - Word origins
- [ ] `identify/linguistic/Homonym` - Same spelling/sound
- [ ] `identify/linguistic/Synonym` - Same meaning
- [ ] `identify/linguistic/Antonym` - Opposite meaning

### Group 9: Additional Format Components (Priority: Low)
- [ ] `format/code/Algorithm` - Algorithm presentation
- [ ] `format/code/Pseudocode` - Pseudocode formatting
- [ ] `format/code/Terminal` - Terminal/console output

### Group 10: Template Components (Priority: Low)
Page-level templates:
- [ ] `templates/ArticlePage` - Blog/article layout
- [ ] `templates/DocumentationPage` - Docs layout
- [ ] `templates/LandingPage` - Marketing page
- [ ] `templates/DashboardPage` - Admin dashboard
- [ ] `templates/FormPage` - Form-centric layout

## Implementation Strategy

### Phase 1: Core Functionality (Groups 1-3)
Complete all empty component files that already exist. These are high priority because they're already referenced in documentation.

### Phase 2: Interactive Foundation (Group 4)
Build the essential form and button components that enable user interaction. These are critical for any web application.

### Phase 3: Structure & Layout (Groups 5-6)
Create layout and media components that provide page structure and content presentation.

### Phase 4: Progressive Enhancement (Group 7)
Add dynamic UI components that enhance user experience when JavaScript is available but degrade gracefully.

### Phase 5: Expansion (Groups 8-10)
Add new semantic components and page templates to round out the library.

## Technical Requirements for All Components

1. **Base Requirements**:
   - Extend from appropriate base class
   - Work without JavaScript
   - Semantic HTML output
   - ARIA attributes where appropriate
   - Schema.org/structured data support

2. **Progressive Enhancement**:
   - Use `data-enhance` attributes
   - Graceful degradation
   - Optional client-side features

3. **Testing**:
   - Unit tests for component logic
   - E2E tests for user interaction
   - Accessibility tests (WCAG 2.3 AAA)
   - No-JS/No-CSS tests

4. **Documentation**:
   - JSDoc comments
   - Usage examples
   - Props documentation
   - Enhancement options

## Recommended Working Order

Start with **Group 1 Batch 1A** (Character Components) as these are straightforward semantic components that follow existing patterns. Then proceed through the batches in order, completing one batch before moving to the next. This approach:

1. Maintains focus and reduces context switching
2. Allows for pattern establishment and reuse
3. Provides quick wins with simpler components first
4. Builds foundation for more complex components

## Notes

- All components in `identify/` categories are primarily semantic markers
- Components in `interact/` need careful progressive enhancement
- Layout components should use CSS Grid/Flexbox with fallbacks
- Media components need accessibility features (transcripts, captions)
- Dynamic components are enhancement-only (must work as static HTML)