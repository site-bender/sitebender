# ADR-001: Align Sitebender Studio with ISO/IEC 11179 Metadata Registry Standard

**Status**: ✅ Accepted

**Date**: 2025-11-05

**Authors**: Sitebender Architecture Team

**Deciders**: Guy (Project Lead)

---

## Context and Problem Statement

Sitebender Studio's architecture treats "everything as data": JSX components transform into Internal Representations (IR), serialize to RDF triples (Turtle format), store in Oxigraph triple store, and become queryable via SPARQL.

Form field components (`<TextField>`, `<IntegerField>`, `<EmailField>`, etc.) define **data structures with semantic meaning, validation rules, and value constraints**. These are, essentially, **metadata about data**—the same problem domain addressed by ISO/IEC 11179 Metadata Registries (MDR).

**Key questions**:

1. Should we align Sitebender's data model with ISO/IEC 11179's proven metamodel?
2. If yes, which library should own this alignment?
3. What are the tradeoffs between alignment (standards compliance, interoperability) and independence (flexibility, simplicity)?

---

## Decision Drivers

### 1. Architectural Consistency

Sitebender already implements core concepts:

- **Data Elements**: Form fields with semantic meaning
- **Value Domains**: Type constraints + validation rules
- **Metadata Registry**: Pathfinder's triple store

Alignment formalizes what we already do, using standard terminology.

### 2. Interoperability Requirements

Key stakeholder domains use ISO/IEC 11179:

- **Healthcare**: HL7 FHIR, NIH CDE Repository
- **Government**: Open data portals, data.gov schemas
- **Enterprise**: Corporate data catalogs (Collibra, Alation)

Formal alignment enables data exchange with these systems.

### 3. Developer Experience

Standard terminology reduces cognitive load:

- Developers familiar with ISO/IEC 11179 understand Sitebender immediately
- Documentation maps to international standard (no invented terms)
- Educational resources (books, courses, papers) apply directly

### 4. AI and Machine Learning

Semantic metadata enables AI applications:

- **Code generation**: AI generates forms from natural language
- **Data discovery**: "Find all fields related to customer identity"
- **Automated mapping**: Map between schemas automatically
- **Quality analysis**: Detect inconsistencies and anomalies

ISO/IEC 11179's formal structure makes these applications tractable.

### 5. Governance and Compliance

Enterprise/regulatory requirements:

- **GDPR**: Track personal data elements, deletion requirements
- **HIPAA**: Document PHI fields, access controls
- **SOX**: Audit trail for financial data definitions
- **21 CFR Part 11**: Electronic records for FDA compliance

ISO/IEC 11179 provides proven governance framework.

---

## Considered Options

### Option 1: No Alignment (Status Quo)

**Description**: Continue with current architecture. Use Sitebender-specific terminology (Artificer IR, field components, validation rules).

**Pros**:

- ✅ No additional work required
- ✅ Complete flexibility in data model evolution
- ✅ No complexity from external standard
- ✅ Faster initial development

**Cons**:

- ❌ Missed opportunity for interoperability with healthcare/gov/enterprise
- ❌ Reinventing solutions to solved problems (metadata versioning, governance, etc.)
- ❌ Higher cognitive load (learning Sitebender-specific terms vs. industry standard)
- ❌ Harder for AI to understand our metadata (no formal ontology)
- ❌ No credibility boost from standards compliance

### Option 2: Informal Alignment (Documentation Only)

**Description**: Document how Sitebender concepts map to ISO/IEC 11179 terminology, but don't change implementation.

**Pros**:

- ✅ Zero code changes required
- ✅ Immediate clarity for developers familiar with standard
- ✅ Marketing/positioning benefit
- ✅ Foundation for future formal alignment

**Cons**:

- ❌ No technical interoperability (can't import/export to external registries)
- ❌ Mapping may drift over time as implementation evolves
- ❌ Limited benefits beyond documentation

### Option 3: Full ISO/IEC 11179 Compliance (Immediate)

**Description**: Immediately implement complete ISO/IEC 11179 Part 3 metamodel, seek certification.

**Pros**:

- ✅ Maximum interoperability with external systems
- ✅ "ISO/IEC 11179 certified" marketing badge
- ✅ Confidence that implementation is correct

**Cons**:

- ❌ Significant development effort (months of work)
- ❌ Heavyweight standard (many entities we may not need)
- ❌ Premature optimization (not all features needed yet)
- ❌ Delays core product development
- ❌ Certification is expensive and time-consuming

### Option 4: Incremental Alignment (Phase-Gated) ✅ **SELECTED**

**Description**: Align incrementally in 4 phases:

1. **Phase 1**: Document conceptual mapping (docs only, zero code)
2. **Phase 2**: Add ISO/IEC 11179 RDF vocabulary to Pathfinder
3. **Phase 3**: Expose MDR-compliant APIs (REST, SPARQL endpoint)
4. **Phase 4**: Full metamodel + certification (optional, future)

**Pros**:

- ✅ Immediate benefits (clarity, positioning) with minimal work
- ✅ Technical benefits accrue incrementally as needed
- ✅ Each phase delivers value independently
- ✅ Can stop at any phase if ROI diminishes
- ✅ De-risks investment (validate benefits before full commitment)
- ✅ Aligns with lean/agile development philosophy

**Cons**:

- ❌ Benefits delayed compared to full implementation
- ❌ Requires discipline to maintain alignment across phases
- ❌ Potential rework if Phase 1 mapping proves incorrect

---

## Decision Outcome

**Chosen option**: **Option 4 (Incremental Alignment, Phase-Gated)**

**Rationale**:

1. **Sitebender's architecture is already conceptually aligned** with ISO/IEC 11179. We're not changing what we build—just formalizing it with standard terminology.

2. **Phase 1 delivers immediate value** (clarity, positioning) with **zero code changes**. This validates alignment before investing in implementation.

3. **Phase 2 provides technical interoperability** without heavyweight governance processes. This is the "80/20" sweet spot for most use cases.

4. **Phase 3+ are optional enhancements** for enterprise/government customers who require full compliance. We can defer until market demand justifies investment.

5. **Incremental approach de-risks** the decision. If alignment proves unhelpful, we stop at Phase 1 with minimal sunk cost.

---

## Implementation Plan

### Phase 1: Conceptual Alignment (Immediate)

**Objective**: Document mapping between Sitebender and ISO/IEC 11179 concepts.

**Deliverables**:

- [x] Comprehensive alignment document (`ISO_IEC_11179_ALIGNMENT.md`)
- [ ] Architecture Decision Record (this document)
- [ ] Pathfinder README updates
- [ ] Contracts documentation

**Timeline**: 1-2 days (documentation only)

**Success Criteria**:

- Team understands ISO/IEC 11179 concepts
- Clear roadmap for Phases 2-4
- Marketing can position Sitebender as "ISO/IEC 11179-inspired"

### Phase 2: RDF Vocabulary Integration (Next)

**Objective**: Add ISO/IEC 11179 RDF ontology to Pathfinder.

**Deliverables**:

- ISO/IEC 11179 Turtle ontology (`pathfinder/iso11179/ontology/iso11179.ttl`)
- Pathfinder functions: `insertDataElement`, `queryDataElements`, etc.
- Artificer metadata extraction during JSX → IR compilation
- Example application demonstrating metadata registry

**Timeline**: 2-3 weeks (1 developer full-time)

**Success Criteria**:

- Artificer automatically extracts and registers metadata
- SPARQL queries return ISO/IEC 11179-compliant triples
- Example form demonstrates end-to-end flow

**Dependencies**:

- Pathfinder core infrastructure must be complete
- Requires Artificer → Pathfinder dependency (update `contracts/boundaries.json`)

### Phase 3: MDR-Compliant APIs (Future)

**Objective**: Expose REST APIs conforming to ISO/IEC 11179 registry interface.

**Deliverables**:

- REST API endpoints (`/api/mdr/`)
- Metadata browser UI
- Import/export utilities (JSON, XML, Turtle)
- Versioning and lifecycle management

**Timeline**: 4-6 weeks (2 developers full-time)

**Success Criteria**:

- External systems can query our metadata registry
- Import data elements from NIH CDE Repository, Schema.org, etc.
- Metadata browser deployed and usable

**Trigger**: Enterprise customer requires ISO/IEC 11179 compliance

### Phase 4: Full Registry Implementation (Optional)

**Objective**: Complete ISO/IEC 11179 Part 3 metamodel, seek certification.

**Deliverables**:

- Full metamodel conformance
- Federated registry support
- Data lineage tracking
- Impact analysis tools
- AI-powered metadata discovery
- ISO/IEC 11179 certification

**Timeline**: 8-12 weeks (2-3 developers full-time)

**Success Criteria**:

- ISO/IEC 11179 certification obtained
- Federated queries across multiple registries
- Published standard specification

**Trigger**: Healthcare/government RFP requires certification

---

## Library Ownership

### Primary Owner: Pathfinder

**Rationale**: ISO/IEC 11179 is fundamentally a **metadata REGISTRY standard** (storage, query, governance). Pathfinder is Sitebender's registry infrastructure—THE single source of truth for triple store access.

**Pathfinder's responsibilities**:

- ISO/IEC 11179 RDF ontology
- Metadata insertion/update/delete/query functions
- SPARQL query templates
- RDFS/OWL reasoning over metadata

**Location**: `/libraries/pathfinder/iso11179/`

### Supporting Role: Artificer

**Rationale**: Artificer owns JSX → IR → Turtle transformation. Natural place to extract metadata during compilation.

**Artificer's responsibilities**:

- Extract metadata from component IR
- Generate ISO/IEC 11179-compliant triples
- Call Pathfinder to register metadata

**Location**: `/libraries/artificer/iso11179/`

### Supporting Role: Architect

**Rationale**: Architect provides form field components—the authoring interface for data elements.

**Architect's responsibilities**:

- Document mapping between component props and ISO/IEC 11179 attributes
- Ensure component design supports metadata extraction

**Location**: `/libraries/architect/docs/ISO_IEC_11179_MAPPING.md`

### Dependency Updates Required

**Current** (from `contracts/boundaries.json`):

```
Layer 3: Architect, Artificer (depend on Arborist, Toolsmith)
```

**Required for Phase 2+**:

```
Layer 3: Architect, Artificer (depend on Arborist, Toolsmith, Pathfinder)
```

Artificer needs Pathfinder dependency to register metadata during compilation.

---

## Consequences

### Positive Consequences

1. **Standards Compliance**: "ISO/IEC 11179-aligned" positioning for enterprise/government markets
2. **Interoperability**: Import/export data elements from healthcare, government, and enterprise systems
3. **Developer Experience**: Standard terminology reduces cognitive load
4. **Documentation**: Metadata IS documentation (living, always-accurate data dictionary)
5. **AI Applications**: Semantic metadata enables code generation, discovery, mapping, quality analysis
6. **Governance**: Proven framework for versioning, stewardship, lifecycle management
7. **Query Power**: Rich SPARQL queries over metadata relationships (synonyms, derivations, hierarchies)

### Negative Consequences

1. **Complexity**: Additional abstraction layer (though Phase 1 mitigates with docs-only approach)
2. **Maintenance**: Ontology and mappings must stay synchronized
3. **Learning Curve**: Team must understand ISO/IEC 11179 concepts (mitigated by comprehensive docs)
4. **Dependency Change**: Artificer → Pathfinder dependency requires contract update

### Risks and Mitigation

| Risk                                 | Probability | Impact | Mitigation                                          |
| ------------------------------------ | ----------- | ------ | --------------------------------------------------- |
| ISO/IEC 11179 proves too heavyweight | Medium      | Medium | Phase-gated approach allows early exit if unhelpful |
| Team rejects standard terminology    | Low         | Medium | Phase 1 validation before code changes              |
| External registries incompatible     | Low         | Medium | Test import/export with real-world data in Phase 2  |
| Performance degradation              | Low         | High   | Benchmark Pathfinder triple store queries early     |
| Certification too expensive          | Medium      | Low    | Make Phase 4 (certification) optional               |

---

## Validation

### Success Metrics

**Phase 1 (Documentation)**:

- [ ] Alignment document reviewed and approved
- [ ] Team members can explain Data Element vs. Value Domain vs. Conceptual Domain
- [ ] Marketing incorporates ISO/IEC 11179 alignment into positioning

**Phase 2 (RDF Vocabulary)**:

- [ ] Example form successfully registers metadata in Pathfinder
- [ ] SPARQL query returns correct ISO/IEC 11179 triples
- [ ] Metadata extraction adds < 5% overhead to compilation time
- [ ] 100% test coverage for Pathfinder ISO/IEC 11179 functions

**Phase 3 (MDR APIs)**:

- [ ] External system successfully imports data elements via REST API
- [ ] Metadata browser handles 10,000+ data elements with < 100ms query time
- [ ] Import from NIH CDE Repository succeeds
- [ ] API uptime > 99.9%

**Phase 4 (Full Implementation)**:

- [ ] ISO/IEC 11179 certification obtained
- [ ] Federated query across 3+ registries succeeds
- [ ] Data lineage visualizes complete ETL pipeline
- [ ] AI generates forms from natural language with 90%+ accuracy

### Review Points

- **After Phase 1**: Review alignment document. Decide whether to proceed to Phase 2.
- **After Phase 2**: Evaluate technical implementation. Assess ROI for Phase 3.
- **After Phase 3**: Assess market demand for certification. Decide on Phase 4.
- **Annual**: Review continued relevance of ISO/IEC 11179 alignment.

---

## Alternatives Not Considered

### Why Not Other Metadata Standards?

**Dublin Core**:

- Simpler than ISO/IEC 11179
- Focused on web resources (documents, images, videos)
- Lacks data element structure (no Value Domain concept)
- **Verdict**: Use Dublin Core terms WITHIN ISO/IEC 11179 registry

**Schema.org**:

- Rich vocabulary for web content
- Good for SEO, knowledge graphs
- Not designed for data element governance
- **Verdict**: Use Schema.org vocabulary WITHIN ISO/IEC 11179 registry

**ISO 8000 (Data Quality)**:

- Complementary to ISO/IEC 11179
- Focuses on data quality characteristics
- **Verdict**: Consider for Phase 4 (quality analysis)

**DCAT (Data Catalog Vocabulary)**:

- W3C standard for data catalogs
- Focuses on datasets, not individual data elements
- **Verdict**: Use for dataset-level metadata, ISO/IEC 11179 for element-level

---

## Related Decisions

### Future ADRs to Write

- **ADR-002**: Pathfinder triple store backend selection (Oxigraph vs. alternatives)
- **ADR-003**: SPARQL query optimization strategy
- **ADR-004**: Metadata versioning and lifecycle state machine
- **ADR-005**: Federation protocol for distributed metadata registries

### Dependency Decisions

This ADR depends on:

- Pathfinder being designated as core infrastructure library (Layer 1-2)
- RDF/Turtle as canonical serialization format for Sitebender IR

This ADR enables:

- Artificer metadata extraction during compilation
- Envoy metadata visualization and data dictionary generation
- Sentinel access control for metadata operations
- Operator event logging for metadata changes

---

## References

### ISO/IEC 11179 Standard

- ISO/IEC 11179-1:2023 (Framework)
- ISO/IEC 11179-3:2023 (Metamodel)
- ISO/IEC 11179-5 (Naming principles)
- ISO/IEC 11179-6 (Registration process)

### Existing Implementations

- **semanticMDR** (GitHub): ISO/IEC 11179 + RDF/OWL
- **Aristotle Metadata Registry**: Open-source MDR
- **caDSR**: NCI Cancer Data Standards Repository

### Academic Papers

- "The ISO/IEC 11179 norm for metadata registries" (Journal of Biomedical Informatics, 2013)
- "Clinical Data Element Ontology" (PMC4231180)
- "Principles of Metadata Registries" (DELOS Working Group)

### Sitebender Documentation

- `/libraries/pathfinder/ISO_IEC_11179_ALIGNMENT.md` (comprehensive alignment doc)
- `/libraries/pathfinder/README.md`
- `/contracts/boundaries.json`

---

## Change Log

| Date       | Version | Changes              | Author                       |
| ---------- | ------- | -------------------- | ---------------------------- |
| 2025-11-05 | 1.0.0   | Initial ADR approved | Sitebender Architecture Team |

---

## Approval

**Approved by**: Guy (Project Lead)

**Date**: 2025-11-05

**Next Review**: After Phase 1 completion (estimated 2025-11-07)

---

_Architecture decisions are living documents. This ADR will be updated as implementation progresses and new information emerges._
