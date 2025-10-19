# JSX Rules

## Locale providers must handle locale detection, fallback chains, and regional variations correctly

- **Rule ID**: JSX_I18N_002
- **Description**: Locale providers must handle locale detection, fallback chains, and regional variations correctly. Support both static and dynamic locale switching.
- **Keywords**: jsx, i18n, locale, internationalization, fallback, regional, detection, dynamic-switching, cultural-sensitivity
- **Rationale**: Ensures proper internationalization across different deployment scenarios while maintaining user experience and cultural sensitivity. Simplistic locale handling breaks internationalization in complex deployment scenarios and different cultural contexts. Comprehensive locale management with detection, fallback chains, and regional variations supports both static and dynamic locale switching for global applications.

**Prohibited:**
```tsx
<LocaleProvider locale="en" fallback="en" />
```

*Reasoning*: Hardcoded locale without detection, no fallback chain, no regional variation support, no dynamic switching capability

**Required:**
```tsx
<LocaleProvider>
	<DetectFromAcceptLanguageHeader />
	<DetectFrom.UserPreference />
	<FallbackChain locales={["en-US", "en", "es"]} />
	<DateFormat calendar="gregorian" />
	<NumberFormat currency="USD" />
</LocaleProvider>
```

*Scope*: All locale provider components requiring detection, fallback chains, regional variations, and dynamic switching

## Data injection components must specify clear data sources and handle loading/error states consistently

- **Rule ID**: JSX_MATH_003
- **Description**: Data injection components must specify clear data sources and handle loading/error states consistently. FromElement, FromApi components need fallback strategies.
- **Keywords**: jsx, data-injection, reactive, data-sources, loading-states, error-handling, fallback, predictable
- **Rationale**: Ensures reactive data flows are predictable and debuggable across complex application states. Unclear data dependencies make reactive systems unpredictable and hard to debug. Clear data sources with consistent loading/error state handling and fallback strategies enable reliable reactive architectures.

**Prohibited:**
```tsx
<Display id="total" formula="subtotal + taxRate" />
```

*Reasoning*: Implicit data sources, no loading/error states, no fallback strategy, unpredictable reactive behavior

**Required:**
```tsx
<Display id="total">
	<Add>
		<From.Element selector="#subtotal" fallback="0" />
		<From.Api endpoint="/tax-rate" cache="5m" fallback="0.08" />
	</Add>
</Display>
```

*Scope*: All data injection components with external dependencies requiring explicit sources, loading/error states, and fallback strategies

## Collaborative development components must handle real-time editing, conflict resolution, and team coordination with proper permission management

- **Rule ID**: JSX_DEVTOOLS_002
- **Description**: Collaborative development components must handle real-time editing, conflict resolution, and team coordination with proper permission management.
- **Keywords**: jsx, devtools, collaboration, real-time, conflict-resolution, permissions, team-coordination, distributed
- **Rationale**: Ensures collaborative development features work reliably across distributed teams while maintaining project integrity. Unstructured collaboration leads to conflicts and breaks project integrity in distributed team environments. Real-time editing, conflict resolution, and team coordination with proper permission management enables reliable distributed collaboration.

**Prohibited:**
```tsx
<SharedEditor users={teamMembers} allowEdit={true} />
```

*Reasoning*: No real-time editing support, no conflict resolution, no permission management, no team coordination, fragile in distributed environments

**Required:**
```tsx
<CollaborativeSession id="team-project">
	<TeamConfiguration>
		<Participants>
			<Developer role="lead" permissions={["admin", "edit", "approve"]} />
			<Designer role="ux" permissions={["edit", "comment"]} />
		</Participants>
	</TeamConfiguration>
	<RealTimeEditing>
		<CrdtSync strategy="operational-transform" />
		<ConflictResolution automatic={true} fallback="manual" />
	</RealTimeEditing>
</CollaborativeSession>
```

*Scope*: All collaborative development components requiring real-time editing, conflict resolution, team coordination, and permission management

## Dashboard components must maintain proper data flow, real-time updates, and accessibility

- **Rule ID**: JSX_OBSERVABILITY_001
- **Description**: Dashboard components must maintain proper data flow, real-time updates, and accessibility. All metrics must specify units, ranges, and update frequencies.
- **Keywords**: jsx, observability, dashboard, metrics, real-time, accessibility, units, data-flow
- **Rationale**: Ensures observability dashboards provide accurate, timely information while remaining accessible to all team members. Unstructured dashboards without proper metrics provide misleading information and exclude team members. Proper data flow, real-time updates, and accessibility with specified units, ranges, and update frequencies create reliable observability.

**Prohibited:**
```tsx
<Dashboard>
	<Node id="warden" status="ok" />
	<Metric>2.3s</Metric>
</Dashboard>
```

*Reasoning*: No data flow specification, no real-time updates, no accessibility, metrics missing units/ranges/update frequencies

**Required:**
```tsx
<EnvoyWorkflowDashboard>
	<WorkflowCanvas>
		<LibraryNode id="warden" type="governance" status="active">
			<RealTimeMetrics updateInterval="1s">
				<ValidationTime unit="ms" range="0-5000">2300</ValidationTime>
				<ViolationCount>0</ViolationCount>
				<DeveloperSatisfaction>😊</DeveloperSatisfaction>
			</RealTimeMetrics>
		</LibraryNode>
	</WorkflowCanvas>
</EnvoyWorkflowDashboard>
```

*Scope*: All dashboard components requiring real-time metrics with proper units, ranges, update frequencies, and accessibility

## Favor composition over inheritance

- **Rule ID**: JSX_UNIVERSAL_003
- **Description**: Favor composition over inheritance. Components should be small, focused, and composable. Use children patterns and declarative nesting for flexible composition.
- **Keywords**: jsx, composition, inheritance, children, declarative, nesting, small-components, focused, building-blocks
- **Rationale**: Enables complex applications from simple building blocks while maintaining predictable behavior and testability across all Studio libraries. Monolithic components become unmaintainable and untestable. Small, focused, composable components with children patterns and declarative nesting create flexible, maintainable architectures.

**Prohibited:**
```tsx
<CheckoutWorkflow 
	authProvider="oauth" 
	paymentGateway="stripe" 
	states={checkoutConfig} 
/>
```

*Reasoning*: Monolithic component configuration, no composition, complex implicit behavior, untestable, unmaintainable

**Required:**
```tsx
<StateMachine name="checkout">
	<State name="cart">
		<Transition on="proceed" to="payment" />
	</State>
	<State name="payment">
		<Authentication required />
		<Transition on="complete" to="confirmation" />
	</State>
</StateMachine>
```

*Scope*: All component designs - favor small, focused, composable components with children patterns and declarative nesting

## Event components must specify transport mechanisms, retry policies, and failure handling

- **Rule ID**: JSX_EVENTS_002
- **Description**: Event components must specify transport mechanisms, retry policies, and failure handling. Support both local and distributed event delivery.
- **Keywords**: jsx, events, transport, retry, failure-handling, distributed, local, reliable-delivery
- **Rationale**: Ensures reliable event delivery across different deployment scenarios while maintaining performance and consistency. Implicit transport assumptions cause events to fail in different deployment environments. Explicit transport mechanisms, retry policies, and failure handling enable reliable event delivery.

**Prohibited:**
```tsx
<EventBus events={userEvents} />
```

*Reasoning*: No transport specification, no retry policy, no failure handling, implicit assumptions break in different deployments

**Required:**
```tsx
<Channel id="user-actions" transport="websocket" scope="session">
	<RetryPolicy attempts={3} backoff="exponential" />
	<Persistence strategy="memory" maxEvents={1000} />
</Channel>
```

*Scope*: All event components requiring transport specification, retry policies, failure handling, and deployment flexibility

## Semantic components must be used in appropriate contexts

- **Rule ID**: JSX_SEMANTIC_001
- **Description**: Semantic components must be used in appropriate contexts. Heading components must be properly nested, Article components must contain meaningful content structures.
- **Keywords**: jsx, semantic, accessibility, seo, context-aware, heading, nesting, pagewright, html-structure
- **Rationale**: Ensures generated HTML maintains proper semantic structure for accessibility and SEO while leveraging Pagewright's context-aware compilation. Improper semantic structure breaks accessibility, SEO, and context-aware compilation features. Context-aware component usage with proper nesting creates valid, accessible semantic HTML.

**Prohibited:**
```tsx
<div>
	<Heading level={3}><Title>Main Article</Title></Heading>
	<Heading level={1}><Title>Section Title</Title></Heading>
</div>
```

*Reasoning*: Improper semantic structure, incorrect heading nesting, breaks accessibility and SEO, invalid context usage

**Required:**
```tsx
<Article>
	<Heading><Title>Main Article</Title></Heading>
	<Section>
		<Heading><Title>Section Title</Title></Heading>
		<Paragraph>Content...</Paragraph>
	</Section>
</Article>
```

*Scope*: All semantic components requiring context-aware usage with proper nesting for accessibility and SEO

## Compliance validation components must support multiple regulatory frameworks with specific technical and procedural requirements

- **Rule ID**: JSX_GOVERNANCE_003
- **Description**: Compliance validation components must support multiple regulatory frameworks with specific technical and procedural requirements. Use standard compliance identifiers.
- **Keywords**: jsx, governance, compliance, regulatory, gdpr, hipaa, frameworks, validation, automated
- **Rationale**: Ensures workflows meet regulatory requirements across different jurisdictions while providing automated compliance verification. Generic compliance checking fails to meet specific regulatory requirements and makes automated verification impossible. Multiple regulatory frameworks with specific technical and procedural requirements using standard identifiers enable automated compliance.

**Prohibited:**
```tsx
<ComplianceChecker
	frameworks={["GPDR", "HIPAA"]}
	rules={complianceRules}
/>
```

*Reasoning*: Generic compliance checking, no specific framework support, no technical requirements, no automated verification

**Required:**
```tsx
<ComplianceValidation>
	<RegulatoryFrameworks>
		<Gpdr>
			<DataProcessingLawfulness>
				<ConsentManagement required={true} />
				<DataMinimization enforced={true} />
				<RightToErasure implemented={true} />
			</DataProcessingLawfulness>
			<TechnicalMeasures>
				<EncryptionAtRest required={true} />
				<AccessControls granular={true} />
			</TechnicalMeasures>
		</Gpdr>
		<Hipaa>
			<TechnicalSafeguards>
				<AccessControl unique="user-identification" />
				<AuditControls />
				<Integrity />
			</TechnicalSafeguards>
		</Hipaa>
	</RegulatoryFrameworks>
</ComplianceValidation>
```

*Scope*: All compliance components requiring multiple regulatory frameworks with specific technical/procedural requirements and automated verification

## Collaborative components must define clear ownership, permission, and conflict resolution patterns

- **Rule ID**: JSX_DISTRIBUTED_003
- **Description**: Collaborative components must define clear ownership, permission, and conflict resolution patterns. Support graceful degradation when peers are offline.
- **Keywords**: jsx, distributed, collaboration, ownership, permissions, conflict-resolution, offline, graceful-degradation
- **Rationale**: Ensures collaborative features work reliably across network conditions while maintaining data consistency and user experience. Fragile collaborative patterns fail during network issues and provide poor user experience. Clear ownership, permission, and conflict resolution patterns with graceful degradation enable reliable collaboration.

**Prohibited:**
```tsx
<SharedWorkspace 
	owner="alice" 
	collaborators={["bob", "charlie"]} 
	requiresConnection={true} 
/>
```

*Reasoning*: No clear ownership model, no permission granularity, no conflict resolution, no offline support, fails during network issues

**Required:**
```tsx
<CollaborativeWorkflow id="design-session">
	<Permissions>
		<Owner can="admin" />
		<Collaborator can="edit comment" />
		<Viewer can="read" />
	</Permissions>
	<OfflineStrategy>
		<QueueChanges />
		<SyncOnReconnect />
	</OfflineStrategy>
</CollaborativeWorkflow>
```

*Scope*: All collaborative components requiring ownership, permissions, conflict resolution, and graceful offline degradation

## Components must be configured through declarative data structures rather than imperative code

- **Rule ID**: JSX_UNIVERSAL_001
- **Description**: Components must be configured through declarative data structures rather than imperative code. All component behavior should be derivable from props and composition patterns.
- **Keywords**: jsx, data-as-configuration, declarative, serializable, rdf, triples, deterministic, pagewright, studio
- **Rationale**: Ensures all components can be serialized, stored as RDF triples, and reconstructed deterministically. Enables the core Studio principle that 'everything is data.' Components configured through imperative code become tightly coupled to behavior and cannot be serialized or stored as data structures.

**Prohibited:**
```tsx
<Authentication onMount={() => setupOAuth("github")} />
```

*Reasoning*: Imperative callback, not serializable, cannot be stored as RDF triples, breaks data-as-configuration principle

**Required:**
```tsx
<Authentication>
	<OAuthTwo provider="github" scopes={["read:user"]} />
</Authentication>
```

*Scope*: All components - must be configurable through declarative data structures, serializable, reconstructible from RDF triples

## Translation components must use structured keys, support interpolation, and handle pluralization correctly

- **Rule ID**: JSX_I18N_001
- **Description**: Translation components must use structured keys, support interpolation, and handle pluralization correctly. Maintain type safety for translation keys and parameters.
- **Keywords**: jsx, i18n, translation, interpolation, pluralization, type-safety, structured-keys, linguistic
- **Rationale**: Ensures translations are maintainable, type-safe, and support complex linguistic features while enabling automated translation workflows. Unsafe translation patterns break type safety and make complex linguistic features like pluralization impossible. Structured keys, interpolation support, and correct pluralization handling with type safety enable robust internationalization.

**Prohibited:**
```tsx
<Translation key="welcome" values={[userName, itemCount]} />
```

*Reasoning*: Unsafe value array, no type safety, no pluralization support, no interpolation structure, breaks maintainability

**Required:**
```tsx
<Translation 
	key="user.greeting.welcome" 
	params={{name: userName, count: itemCount}}
	plural="count"
>
	<Zero>Welcome back!</Zero>
	<One>Welcome back, {name}! You have {count} item.</One>
	<Other>Welcome back, {name}! You have {count} items.</Other>
</Translation>
```

*Scope*: All translation components requiring structured keys, interpolation, pluralization, and type safety

## Visual workflow components must maintain coordinate systems, support collaborative editing, and provide accessibility features for workflow navigation

- **Rule ID**: JSX_STATE_002
- **Description**: Visual workflow components must maintain coordinate systems, support collaborative editing, and provide accessibility features for workflow navigation.
- **Keywords**: jsx, state, visual-workflow, coordinates, collaboration, accessibility, navigation, consistency
- **Rationale**: Ensures visual workflows are accessible, collaborative, and maintain consistency between visual and logical representations. Inaccessible visual workflows exclude users and break consistency between visual and logical state representations. Coordinate systems, collaborative editing, and accessibility features enable inclusive visual workflows.

**Prohibited:**
```tsx
<WorkflowCanvas>
	<Node id="1" x={100} y={200} />
	<Edge from="1" to="2" />
</WorkflowCanvas>
```

*Reasoning*: No coordinate system, no collaborative support, no accessibility features, no semantic consistency with state

**Required:**
```tsx
<StateMachineWorkflowCanvas>
	<State 
		name="initial" 
		position={[100, 200]} 
		ariaLabel="Initial state at coordinates 100, 200"
	>
		<Transitions>
			<Transition 
				to="processing" 
				event="start" 
				path="curved"
				ariaLabel="Transition to processing on start event" 
			/>
		</Transitions>
	</State>
	<Grid visible={true} snapTo={25} />
</StateMachineWorkflowCanvas>
```

*Scope*: All visual workflow components requiring coordinate systems, collaborative editing, accessibility, and visual-logical consistency

## Mathematical operation components must have consistent structure with clear operand identification

- **Rule ID**: JSX_MATH_001
- **Description**: Mathematical operation components must have consistent structure with clear operand identification. Use semantic child components like Referent and Comparand.
- **Keywords**: jsx, math, operations, operands, semantic, referent, comparand, readable, formula
- **Rationale**: Ensures mathematical expressions are readable, debuggable, and can be reliably converted between JSX and formula notation. Unclear operand roles make mathematical expressions unreadable and error-prone. Consistent structure with clear operand identification using semantic child components creates maintainable mathematical expressions.

**Prohibited:**
```tsx
<IsGreaterThan left="#age" right="18" />
```

*Reasoning*: Unclear operand roles, left/right not semantically meaningful, hard to read, error-prone

**Required:**
```tsx
<IsGreaterThan>
	<Referent><From.Element selector="#age" /></Referent>
	<Comparand><Value>18</Value></Comparand>
</IsGreaterThan>
```

*Scope*: All mathematical operation components requiring clear operand identification with semantic child components

## State machine components must define explicit states, transitions, and guards

- **Rule ID**: JSX_STATE_001
- **Description**: State machine components must define explicit states, transitions, and guards. All state changes must be deterministic and auditable.
- **Keywords**: jsx, state-machine, states, transitions, guards, deterministic, auditable, predictable
- **Rationale**: Ensures application state is predictable, debuggable, and can be visualized or restored from audit logs. Implicit state management makes application behavior unpredictable and impossible to debug or audit. Explicit states, transitions, and guards with deterministic and auditable state changes create reliable state management.

**Prohibited:**
```tsx
<DocumentEditor 
	status={docStatus} 
	onStatusChange={setDocStatus} 
	rules={statusRules} 
/>
```

*Reasoning*: Implicit state management, no explicit states/transitions, unpredictable behavior, not auditable, impossible to debug

**Required:**
```tsx
<StateMachine name="document-lifecycle">
	<State name="draft">
		<Transition 
			on="publish" 
			to="published" 
			guard={hasRequiredFields} 
		/>
	</State>
	<State name="published">
		<Transition on="archive" to="archived" />
		<Transition on="edit" to="draft" />
	</State>
</StateMachine>
```

*Scope*: All state machine components requiring explicit states, transitions, guards, deterministic changes, and auditability

## Studio JSX is a domain-specific language for data-driven components, not React

- **Rule ID**: JSX_UNIVERSAL_005
- **Description**: Studio JSX is a domain-specific language for data-driven components, not React. Understanding this distinction is crucial for proper component design.
- **Keywords**: jsx, not-react, studio, data-driven, dsl, domain-specific, data-structures, pagewright
- **Rationale**: Studio JSX is a domain-specific language for data-driven components, not React. Understanding this distinction is crucial for proper component design. Treating Studio JSX like React leads to imperative patterns that break data-first architecture. Studio JSX compiles to data structures, not virtual DOM - components are data configurations, not stateful objects.

**Prohibited:**
```tsx
const [auth, setAuth] = useState()
return <AuthProvider value={auth}>{children}</AuthProvider>
```

*Reasoning*: React patterns, stateful objects, imperative hooks, virtual DOM assumptions, breaks data-first architecture

**Required:**
```tsx
<Authentication>
	<OAuthTwo provider="github" />
	<WebAuthn fallback />
</Authentication>
```

*Scope*: All component designs - Studio JSX compiles to data structures, not React virtual DOM

## Distributed components must properly handle identity verification and capability delegation

- **Rule ID**: JSX_DISTRIBUTED_002
- **Description**: Distributed components must properly handle identity verification and capability delegation. Use cryptographic identifiers consistently.
- **Keywords**: jsx, distributed, identity, authentication, cryptographic, capability, delegation, security, did
- **Rationale**: Ensures secure collaboration and proper attribution in distributed systems while maintaining user privacy and data integrity. Unsafe identity patterns compromise security and break attribution in distributed collaborative systems. Proper identity verification and capability delegation with cryptographic identifiers enable secure distributed collaboration.

**Prohibited:**
```tsx
<CollaborativeText userId="john123" allowEdit={true} />
```

*Reasoning*: Unsafe identity pattern, no cryptographic verification, no capability delegation, compromises security and attribution

**Required:**
```tsx
<CollaborativeText id="doc-456">
	<Identity>
		<DidKey key="did:key:z6Mk..." />
		<Capabilities read write />
	</Identity>
	<Rga showCursors={true} />
</CollaborativeText>
```

*Scope*: All distributed components requiring identity verification, capability delegation, and cryptographic identifiers

## Components that accept formula strings must validate mathematical syntax and variable references

- **Rule ID**: JSX_MATH_002
- **Description**: Components that accept formula strings must validate mathematical syntax and variable references. Provide clear error messages for invalid formulas using monadic patterns.
- **Keywords**: jsx, math, formula, validation, monads, safe-composition, error-handling, syntax
- **Rationale**: Prevents runtime errors and provides better development experience when working with mathematical expressions. Monadic patterns ensure safe composition. Unvalidated formulas cause runtime errors and unsafe composition breaks mathematical operations. Formula validation with monadic patterns creates safe, composable mathematical expressions.

**Prohibited:**
```tsx
<MathMlDisplay formula={userInput} />
```

*Reasoning*: No validation, runtime errors possible, no error handling, unsafe composition, poor development experience

**Required:**
```tsx
<MathMlDisplay 
	formula="E = mc²" 
	variables={["E", "m", "c"]}
	onError={handleFormulaError}
/>
```

*Scope*: All components accepting formula strings - must validate syntax, variable references, provide error messages, use monadic patterns

## Components from different libraries must integrate seamlessly

- **Rule ID**: JSX_UNIVERSAL_004
- **Description**: Components from different libraries must integrate seamlessly. Use consistent naming conventions, data formats, and event patterns across all libraries.
- **Keywords**: jsx, cross-library, integration, consistency, naming, data-formats, events, composition
- **Rationale**: Enables complex applications that span multiple domains (authentication + commerce + i18n) while maintaining coherent development experience. Conflicting integration patterns make cross-library composition fragile and development experience inconsistent. Consistent naming conventions, data formats, and event patterns enable seamless cross-library integration.

**Prohibited:**
```tsx
<I18nWrapper locale={currentLocale}>
	<AuthGuard token={authToken}>
		<CommerceProvider config={commerceConfig}>
			{/* Inconsistent prop names and patterns */}
		</CommerceProvider>
	</AuthGuard>
</I18nWrapper>
```

*Reasoning*: Inconsistent naming, different data formats, conflicting patterns, fragile composition, poor development experience

**Required:**
```tsx
<LocaleProvider>
	<Authentication>
		<Cart>
			<Product sku="widget-001">
				<Translation key="product.name" />
			</Product>
		</Cart>
	</Authentication>
</LocaleProvider>
```

*Scope*: All cross-library component integration - consistent naming, data formats, and event patterns required

## Components that generate Schema

- **Rule ID**: JSX_SEMANTIC_002
- **Description**: Components that generate Schema.org markup must use proper microdata patterns and maintain semantic consistency with HTML structure.
- **Keywords**: jsx, schema-org, microdata, semantic, structured-data, rich-snippets, seo, declarative
- **Rationale**: Ensures rich snippets and structured data work correctly while maintaining the declarative nature of Pagewright components. Manual microdata conflicts with semantic structure and breaks Schema.org integration. Proper microdata patterns with semantic consistency enable reliable structured data.

**Prohibited:**
```tsx
<div itemScope itemType="https://schema.org/Recipe">
	<Recipe>
		<span itemProp="name">Cookies</span>
	</Recipe>
</div>
```

*Reasoning*: Manual microdata conflicts with component structure, breaks semantic consistency, duplicates schema information

**Required:**
```tsx
<Recipe>
	<Title>Chocolate Chip Cookies</Title>
	<Author>Jane Chef</Author>
	<Ingredient quantity="2 cups">flour</Ingredient>
	<Instructions step="1">Mix dry ingredients...</Instructions>
</Recipe>
```

*Scope*: All components generating Schema.org markup - use semantic components that compile to proper microdata patterns

## Authorization components must use declarative policy definitions with clear resource and action specifications

- **Rule ID**: JSX_SECURITY_002
- **Description**: Authorization components must use declarative policy definitions with clear resource and action specifications. Support policy composition and testing.
- **Keywords**: jsx, security, authorization, rbac, policies, permissions, resources, auditable, testable
- **Rationale**: Ensures access control is auditable, testable, and maintainable while preventing privilege escalation vulnerabilities. Opaque authorization logic makes security vulnerabilities impossible to detect or audit. Declarative policy definitions with clear resource and action specifications enable auditable, testable access control.

**Prohibited:**
```tsx
<ProtectedRoute 
	allowedRoles={["admin", "editor"]} 
	checkPermission={(user, resource) => checkAccess(user, resource)} 
/>
```

*Reasoning*: Opaque authorization logic, imperative callbacks, not auditable, not testable, security vulnerabilities undetectable

**Required:**
```tsx
<Authorization>
	<Rbac>
		<Role name="editor">
			<Permission action="read" resource="articles:*" />
			<Permission action="write" resource="articles:own" />
		</Role>
		<Role name="admin" inherits="editor">
			<Permission action="*" resource="articles:*" />
		</Role>
	</Rbac>
</Authorization>
```

*Scope*: All authorization components requiring declarative policies, clear resource/action specifications, composition support, testability

## Cryptographic components must use well-established algorithms, proper key management, and clear security properties

- **Rule ID**: JSX_SECURITY_003
- **Description**: Cryptographic components must use well-established algorithms, proper key management, and clear security properties. Provide audit trails for cryptographic operations.
- **Keywords**: jsx, security, cryptography, encryption, algorithms, key-management, audit-trail, zero-knowledge
- **Rationale**: Ensures cryptographic operations are secure, auditable, and follow current best practices while avoiding common cryptographic pitfalls. Unsafe cryptographic patterns expose systems to security vulnerabilities and compliance violations. Well-established algorithms, proper key management, and clear security properties with audit trails enable secure cryptography.

**Prohibited:**
```tsx
<Encryption algorithm="custom" key={userPassword} />
```

*Reasoning*: Custom algorithm, unsafe key management, no security properties, no audit trail, exposes security vulnerabilities

**Required:**
```tsx
<ZeroKnowledge>
	<Proof 
		algorithm="zk-SNARK" 
		statement="age >= 18" 
		without={["name", "birthdate"]} 
	/>
	<Verify circuit="age-verification-v2.circom" />
</ZeroKnowledge>
```

*Scope*: All cryptographic components requiring well-established algorithms, proper key management, security properties, and audit trails

## Developer feedback components must provide contextual prompts, structured data collection, and trend analysis

- **Rule ID**: JSX_OBSERVABILITY_004
- **Description**: Developer feedback components must provide contextual prompts, structured data collection, and trend analysis. Integrate feedback with performance metrics for correlation analysis.
- **Keywords**: jsx, observability, developer-experience, feedback, metrics, correlation, actionable, workflow-improvement
- **Rationale**: Ensures developer experience feedback is actionable and can drive systematic improvements to development workflows. Generic feedback without context provides no actionable insights and fails to improve development workflows. Contextual prompts, structured data collection, and trend analysis with performance metrics correlation create actionable feedback.

**Prohibited:**
```tsx
<FeedbackWidget>
	<RatingScale min={1} max={5} />
	<CommentBox />
</FeedbackWidget>
```

*Reasoning*: Generic feedback, no context, no structured collection, no trend analysis, no metric correlation, not actionable

**Required:**
```tsx
<WorkflowFeedback>
	<DeveloperSatisfaction>
		<FeedbackPrompt
			trigger="workflow-completion"
			context={{
				executionTime: "3.2s",
				errorCount: 0,
				workflowType: "ci-pipeline"
			}}
		>
			How was your experience with this CI pipeline execution?
			<Emojis>😱 😟 😐 😊 🤩</Emojis>
			<OptionalComment placeholder="What could be improved?" />
		</FeedbackPrompt>
		<CorrelationTracking>
			<TrackMetrics>
				<ExecutionTime />
				<ErrorFrequency />
				<CognitiveBurden />
			</TrackMetrics>
		</CorrelationTracking>
	</DeveloperSatisfaction>
</WorkflowFeedback>
```

*Scope*: All developer feedback components requiring contextual prompts, structured collection, trend analysis, and metric correlation

## Workflow monitoring components must provide real-time violation detection, automatic response capabilities, and comprehensive audit trails

- **Rule ID**: JSX_GOVERNANCE_004
- **Description**: Workflow monitoring components must provide real-time violation detection, automatic response capabilities, and comprehensive audit trails. Support both critical and warning level violations.
- **Keywords**: jsx, governance, monitoring, real-time, violations, automatic-response, audit-trail, compliance
- **Rationale**: Ensures workflow governance is enforced continuously and violations are detected and responded to immediately. Basic monitoring without response capabilities allows violations to persist and cause system damage. Real-time violation detection, automatic response capabilities, and comprehensive audit trails enable continuous governance enforcement.

**Prohibited:**
```tsx
<Monitor
	checkCompliance={true}
	alertOnViolation={true}
	logLevel="info"
/>
```

*Reasoning*: Basic monitoring, no real-time detection, no automatic response, violations persist, no audit trail

**Required:**
```tsx
<WorkflowMonitoring>
	<ContractCompliance>
		<RealTimeValidation>
			<CheckBounds continuously={true} />
			<ValidateConnections on="execution" />
			<VerifyPermissions before="sensitive-operations" />
		</RealTimeValidation>
		<ViolationDetection>
			<UnauthorizedConnections severity="critical" />
			<SecurityBoundaryBreach severity="critical" />
			<ResourceLimitExceeded severity="warning" />
		</ViolationDetection>
		<AutomaticResponse>
			<OnCriticalViolation>
				<HaltExecution immediately={true} />
				<NotifySecurityTeam />
				<IsolateWorkflow />
			</OnCriticalViolation>
		</AutomaticResponse>
	</ContractCompliance>
</WorkflowMonitoring>
```

*Scope*: All workflow monitoring components requiring real-time violation detection, automatic responses, and comprehensive audit trails

## Authentication components must support multiple providers, graceful fallbacks, and clear success/failure states

- **Rule ID**: JSX_SECURITY_001
- **Description**: Authentication components must support multiple providers, graceful fallbacks, and clear success/failure states. Avoid hardcoding secrets in components.
- **Keywords**: jsx, security, authentication, oauth, webauthn, providers, fallback, secrets
- **Rationale**: Ensures secure and flexible authentication while maintaining user experience across different authentication scenarios. Insecure authentication patterns expose secrets and provide poor fallback experience. Multiple providers, graceful fallbacks, and clear success/failure states without hardcoded secrets enable secure, flexible authentication.

**Prohibited:**
```tsx
<Authentication 
	githubClientSecret="abc123..." 
	providers={["github"]} 
/>
```

*Reasoning*: Hardcoded secrets, no fallback providers, no failure states, insecure, inflexible, poor user experience

**Required:**
```tsx
<Authentication>
	<OAuthTwo 
		provider="github" 
		clientIdFrom="env:GITHUB_CLIENT_ID"
		scopes={["read:user"]} 
	/>
	<WebAuthn fallback />
	<OnFailure><Redirect to="/login" /></OnFailure>
</Authentication>
```

*Scope*: All authentication components requiring multiple providers, graceful fallbacks, success/failure states, no hardcoded secrets

## Event-driven workflows must be composable and recoverable

- **Rule ID**: JSX_EVENTS_003
- **Description**: Event-driven workflows must be composable and recoverable. Use explicit state machines for complex orchestration patterns.
- **Keywords**: jsx, events, workflow, orchestration, composable, recoverable, state-machine, business-process
- **Rationale**: Ensures complex business processes are reliable, auditable, and can recover gracefully from failures. Implicit workflow coupling makes business processes brittle and impossible to debug or recover. Composable and recoverable event-driven workflows with explicit state machines enable reliable business processes.

**Prohibited:**
```tsx
<OrderProcessor 
	onOrderCreated={validatePayment}
	onPaymentConfirmed={[reserveInventory, sendConfirmation]} 
/>
```

*Reasoning*: Implicit workflow coupling, imperative callbacks, not composable, not recoverable, brittle business process

**Required:**
```tsx
<Workflow name="order-processing">
	<On event="order:created">
		<TriggerWorkflow name="validate-payment" />
	</On>
	<On event="payment:confirmed">
		<Pipe>
			<TriggerWorkflow name="reserve-inventory" />
			<TriggerWorkflow name="send-confirmation" />
		</Pipe>
	</On>
</Workflow>
```

*Scope*: All event-driven workflows requiring composability, recoverability, and explicit state machine orchestration

## AI workflow safety components must define explicit forbidden patterns, required components, and validation pipelines

- **Rule ID**: JSX_GOVERNANCE_002
- **Description**: AI workflow safety components must define explicit forbidden patterns, required components, and validation pipelines. All AI-generated workflows must be validated.
- **Keywords**: jsx, governance, ai-safety, constraints, validation, forbidden-patterns, required-components, security
- **Rationale**: Prevents AI assistants from generating insecure or non-compliant workflows while maintaining development velocity. Implicit AI safety assumptions allow dangerous workflow generation that bypasses security and compliance requirements. Explicit forbidden patterns, required components, and validation pipelines prevent unsafe AI-generated workflows.

**Prohibited:**
```tsx
<AIGuard
	blockedPatterns={dangerousPatterns}
	requiredFeatures={["validation", "logging"]}
/>
```

*Reasoning*: Implicit safety assumptions, generic pattern blocking, no validation pipeline, allows dangerous AI-generated workflows

**Required:**
```tsx
<AiWorkflowSafety>
	<GenerationConstraints>
		<ForbiddenPatterns>
			<Pattern name="direct-database-access" reason="security" />
			<Pattern name="bypass-authentication" reason="security" />
			<Pattern name="unencrypted-transmission" reason="compliance" />
		</ForbiddenPatterns>
		<RequiredComponents>
			<Component name="input-validation" />
			<Component name="error-handling" />
			<Component name="audit-logging" />
		</RequiredComponents>
	</GenerationConstraints>
	<ValidationPipeline>
		<PreValidation>
			<SecurityScanning />
			<ComplianceChecking />
		</PreValidation>
	</ValidationPipeline>
</AiWorkflowSafety>
```

*Scope*: All AI workflow safety components requiring explicit forbidden patterns, required components, and validation pipelines

## Use for instead of htmlFor and class instead of className since Studio's JSX compiles to vanilla HTML, not React components

- **Rule ID**: JSX_UNIVERSAL_006
- **Description**: Use for instead of htmlFor and class instead of className since Studio's JSX compiles to vanilla HTML, not React components.
- **Keywords**: jsx, html-attributes, for, class, not-react, vanilla-html, studio, standard
- **Rationale**: Studio JSX doesn't have JavaScript reserved word conflicts like React does, so standard HTML attributes should be used for clarity and consistency with the final HTML output. Using React-style props like htmlFor and className creates unnecessary abstraction and confusion since Studio JSX compiles to vanilla HTML where for and class are the natural attributes.

**Prohibited:**
```tsx
<Label htmlFor="email-input">Email Address</Label>
<Input id="email-input" className="form-control" type="email" />
```

*Reasoning*: React-style attributes, unnecessary abstraction, inconsistent with vanilla HTML output, confusing

**Required:**
```tsx
<Label for="email-input">Email Address</Label>
<Input id="email-input" class="form-control" type="email" />
```

*Scope*: All JSX components - use standard HTML attributes (for, class) not React attributes (htmlFor, className)

## Workflow governance components must define cryptographically verifiable contracts with clear requirements, compliance frameworks, and verification mechanisms

- **Rule ID**: JSX_GOVERNANCE_001
- **Description**: Workflow governance components must define cryptographically verifiable contracts with clear requirements, compliance frameworks, and verification mechanisms. All contracts must be deterministic and auditable.
- **Keywords**: jsx, governance, cryptographic, contracts, verification, compliance, deterministic, auditable
- **Rationale**: Ensures architectural governance is unbreakable and provides cryptographic proof of compliance for critical business workflows. Unverifiable governance configuration allows violations to go undetected and makes compliance impossible to prove. Cryptographically verifiable contracts with clear requirements, compliance frameworks, and verification mechanisms enable unbreakable governance.

**Prohibited:**
```tsx
<WorkflowConfig
	requirements={["security-scan", "validation"]}
	compliance={complianceRules}
/>
```

*Reasoning*: Unverifiable configuration, no cryptographic proof, violations undetectable, compliance impossible to prove

**Required:**
```tsx
<WorkflowGovernance>
	<WorkflowContract id="ci-cd-pipeline">
		<RequiredComponents>
			<Component name="security-scan" mandatory={true} />
			<Component name="warden-validation" mandatory={true} />
		</RequiredComponents>
		<ComplianceRequirements>
			<Gpdr dataRetention="P2Y" anonymization="required" />
			<Sox auditTrail="complete" approvalRequired={true} />
		</ComplianceRequirements>
	</WorkflowContract>
	<CryptographicVerification>
		<WorkflowSignature algorithm="Ed25519" />
		<IntegrityHash algorithm="SHA-256" />
	</CryptographicVerification>
</WorkflowGovernance>
```

*Scope*: All workflow governance components requiring cryptographic verification, deterministic contracts, and compliance proof

## Performance monitoring components must aggregate data from multiple sources, handle missing data gracefully, and provide historical context for current metrics

- **Rule ID**: JSX_OBSERVABILITY_002
- **Description**: Performance monitoring components must aggregate data from multiple sources, handle missing data gracefully, and provide historical context for current metrics.
- **Keywords**: jsx, observability, performance, monitoring, aggregation, missing-data, historical-context, distributed
- **Rationale**: Ensures performance monitoring provides actionable insights while handling the complexities of distributed systems and intermittent data. Simplistic performance monitoring fails in distributed systems and provides misleading insights without proper data handling. Data aggregation from multiple sources, graceful missing data handling, and historical context enable reliable performance monitoring.

**Prohibited:**
```tsx
<PerformanceMonitor metrics={["latency", "throughput"]} />
```

*Reasoning*: Simplistic monitoring, no multi-source aggregation, no missing data handling, no historical context, misleading in distributed systems

**Required:**
```tsx
<BenchmarkAggregator>
	<CollectFrom>
		<ProductionDeployments />
		<DevelopmentEnvironments />
		<TestRuns />
	</CollectFrom>
	<Metrics>
		<Latency percentiles={[50, 90, 99, 99.9]} />
		<Throughput window="1m" />
		<MemoryUsage peak={true} average={true} />
	</Metrics>
	<HandleMissingData strategy="interpolate" maxGap="5m" />
	<StoreTo tripleStore="benchmarks" retention="30d" />
</BenchmarkAggregator>
```

*Scope*: All performance monitoring components requiring multi-source aggregation, missing data handling, and historical context

## Event components must follow the triple pattern (subject-predicate-object) and maintain referential transparency

- **Rule ID**: JSX_EVENTS_001
- **Description**: Event components must follow the triple pattern (subject-predicate-object) and maintain referential transparency. All events must be serializable.
- **Keywords**: jsx, events, triple-pattern, subject-predicate-object, referential-transparency, serializable, rdf, auditable
- **Rationale**: Ensures event-driven architectures are debuggable, auditable, and can be replayed or analyzed using RDF tools. Opaque event handling makes debugging impossible and breaks audit trail capabilities. Triple pattern (subject-predicate-object) with referential transparency and serializable events enable debuggable, auditable event architectures.

**Prohibited:**
```tsx
<Button onClick={() => saveDocument(doc.id)}>
	Save Document  
</Button>
```

*Reasoning*: Opaque event handling, imperative callback, not serializable, no triple pattern, debugging impossible, no audit trail

**Required:**
```tsx
<Button>
	<Publishes 
		event="user:clicked:save-button" 
		payload={documentId}
		timestamp="auto" 
	/>
	Save Document
</Button>
```

*Scope*: All event components requiring triple pattern, referential transparency, serializability, and audit trails

## Conditional rendering components must have explicit condition and consequence components

- **Rule ID**: JSX_REACTIVE_001
- **Description**: Conditional rendering components must have explicit condition and consequence components. Avoid implicit boolean coercion.
- **Keywords**: jsx, reactive, conditional, rendering, explicit, boolean-coercion, debuggable, mathematical
- **Rationale**: Makes conditional logic explicit and debuggable, especially important when conditions involve complex mathematical expressions. Implicit boolean coercion makes conditional logic hard to debug and understand. Explicit condition and consequence components without implicit boolean coercion create clear, debuggable reactive logic.

**Prohibited:**
```tsx
<ShowIf condition="score > 80">Excellent work!</ShowIf>
```

*Reasoning*: Implicit boolean coercion, string formula not validated, hard to debug, unclear condition structure

**Required:**
```tsx
<ShowIf>
	<Condition>
		<IsGreaterThan>
			<Referent><FromElement selector="#score" /></Referent>
			<Comparand><Value>80</Value></Comparand>
		</IsGreaterThan>
	</Condition>
	<Consequence>
		<Display>Excellent work!</Display>
	</Consequence>
</ShowIf>
```

*Scope*: All conditional rendering components requiring explicit condition and consequence components without implicit coercion

## Visual workflow components must maintain semantic consistency between visual representation and data model

- **Rule ID**: JSX_OBSERVABILITY_003
- **Description**: Visual workflow components must maintain semantic consistency between visual representation and data model. Support collaborative editing with proper conflict resolution.
- **Keywords**: jsx, observability, visual-workflow, semantic-consistency, data-model, collaboration, conflict-resolution, synchronization
- **Rationale**: Ensures visual workflows remain synchronized with their underlying data while supporting real-time collaboration. Visual-only workflows without semantic meaning break synchronization and make collaboration impossible. Semantic consistency between visual representation and data model with collaborative editing support enables reliable visual workflows.

**Prohibited:**
```tsx
<Canvas>
	<Box id="1" x={200} y={300}>Validation</Box>
	<Line from="1" to="2" />
</Canvas>
```

*Reasoning*: Visual-only representation, no semantic data model, no collaboration support, synchronization impossible

**Required:**
```tsx
<WorkflowCanvas>
	<LibraryNode
		id="validation"
		semanticType="governance.validation"
		position={[200, 300]}
		ariaLabel="Validation node at position 200, 300"
	>
		<Inputs>
			<Port name="codebase" type="file[]" required={true} />
		</Inputs>
		<Outputs>
			<Port name="violations" type="violation[]" />
		</Outputs>
	</LibraryNode>
	<Connection
		from="validation.violations"
		to="autofix.input"
		semanticType="error-recovery"
		bidirectional={false}
	/>
</WorkflowCanvas>
```

*Scope*: All visual workflow components requiring semantic consistency, data model synchronization, and collaborative editing

## Developer tool components must support multiple interaction modes (voice, GUI, CLI, collaborative) with consistent data models across all modes

- **Rule ID**: JSX_DEVTOOLS_001
- **Description**: Developer tool components must support multiple interaction modes (voice, GUI, CLI, collaborative) with consistent data models across all modes.
- **Keywords**: jsx, devtools, multi-modal, voice, gui, cli, collaborative, accessibility, consistent
- **Rationale**: Ensures development tooling is accessible and usable across different workflows while maintaining consistent behavior. Single-mode interfaces exclude users and create inconsistent development experiences across different workflows. Multiple interaction modes (voice, GUI, CLI, collaborative) with consistent data models enable accessible, versatile development tools.

**Prohibited:**
```tsx
<ConfigWizard mode="gui" />
```

*Reasoning*: Single-mode interface, excludes users, inconsistent across workflows, not accessible, limited usability

**Required:**
```tsx
<QuartermasterInterface>
	<VoiceGuidedSetup>
		<AiAssistant provider="claude" fallback="text" />
		<ConversationalConfig accessible={true} />
	</VoiceGuidedSetup>
	<GuiWizard fallback="voice" />
	<CliInterface scriptable={true} />
</QuartermasterInterface>
```

*Scope*: All developer tool components requiring multi-modal interaction with consistent data models across voice, GUI, CLI, collaborative modes

## CRDT components must specify unique identifiers, merge strategies, and synchronization policies

- **Rule ID**: JSX_DISTRIBUTED_001
- **Description**: CRDT components must specify unique identifiers, merge strategies, and synchronization policies. All distributed state changes must be commutative and idempotent.
- **Keywords**: jsx, distributed, crdt, merge-strategies, synchronization, consistency, network-partitions, collaborative
- **Rationale**: Ensures distributed components maintain consistency across network partitions and concurrent edits in collaborative environments. Missing distributed state configuration breaks consistency and collaborative features in network partitions. Unique identifiers, merge strategies, and synchronization policies for distributed state enable reliable CRDTs.

**Prohibited:**
```tsx
<Counter value={count} onChange={setCount} />
```

*Reasoning*: No distributed state support, no merge strategy, no synchronization policy, breaks in network partitions

**Required:**
```tsx
<DistributedCounter 
	id="shared-counter-123" 
	mergeStrategy="lww" 
	syncPolicy="immediate"
>
	<SyncWithPeers maxPeers={5} />
	<ConflictResolution strategy="automatic" />
</DistributedCounter>
```

*Scope*: All CRDT components requiring unique identifiers, merge strategies, synchronization policies, and consistency guarantees

## Product components must maintain referential integrity, support variant relationships, and handle inventory tracking

- **Rule ID**: JSX_COMMERCE_001
- **Description**: Product components must maintain referential integrity, support variant relationships, and handle inventory tracking. Use semantic component names that reflect business domain.
- **Keywords**: jsx, commerce, product, variants, inventory, referential-integrity, business-domain, catalog
- **Rationale**: Ensures commerce components accurately represent business relationships while maintaining data consistency across complex product catalogs. Flat product structure breaks referential integrity and makes complex product relationships unmanageable. Referential integrity, variant relationships, and inventory tracking with semantic business domain names enable accurate commerce modeling.

**Prohibited:**
```tsx
<Product 
	sku="WIDGET-001" 
	variants={[{color: "red", size: "S", price: 29.99}]} 
/>
```

*Reasoning*: Flat structure, no referential integrity, no variant relationships, no inventory tracking, unmanageable product catalog

**Required:**
```tsx
<Product sku="WIDGET-001" name="Deluxe Widget">
	<Variant name="color" options={["red", "blue"]} affects="price" />
	<Variant name="size" options={["S", "M", "L"]} affects="inventory" />
	<BasePrice currency="USD">29.99</BasePrice>
	<Inventory>
		<TrackQuantity />
		<ReserveOnAddToCart />
	</Inventory>
</Product>
```

*Scope*: All product components requiring referential integrity, variant relationships, inventory tracking, and semantic business domain names

## Components must work without JavaScript and enhance progressively when client-side functionality is available

- **Rule ID**: JSX_UNIVERSAL_002
- **Description**: Components must work without JavaScript and enhance progressively when client-side functionality is available. Use data-enhance attributes for enhancement hints.
- **Keywords**: jsx, progressive-enhancement, no-javascript, accessibility, performance, reliability, data-enhance
- **Rationale**: Ensures accessibility, performance, and reliability across all network conditions while maintaining the full interactive experience when possible. Client-only functionality breaks accessibility and fails without JavaScript. Components that work without JavaScript and enhance when available create reliable, accessible experiences.

**Prohibited:**
```tsx
<Form onSubmit={handleSubmit}>
	<ValidatedInput name="email" validator={emailValidator} />
</Form>
```

*Reasoning*: Client-only functionality, requires JavaScript, breaks accessibility, fails without JavaScript

**Required:**
```tsx
<Form data-enhance="realtime-validation">
	<Input name="email" type="email" required />
	<Button type="submit">Submit</Button>
</Form>
```

*Scope*: All components - must work without JavaScript, enhance progressively with data-enhance attributes

## Components must use props that compile to data-enhance HTML output attributes for progressive enhancement

- **Rule ID**: JSX_SEMANTIC_003
- **Description**: Components must use props that compile to data-enhance HTML output attributes for progressive enhancement. Props control enhancement behavior, not HTML attributes directly. Enhancement behavior must be additive, not replacing base functionality.
- **Keywords**: jsx, semantic, progressive-enhancement, data-enhance, props, html-output, additive, no-javascript
- **Rationale**: Ensures semantic HTML works perfectly without JavaScript while providing rich interactions when available. Clarifies that data-enhance is HTML output, not JSX props. JavaScript-dependent functionality or direct HTML attributes break progressive enhancement. Props that compile to data-enhance HTML attributes with additive enhancement behavior create reliable progressive experiences.

**Prohibited:**
```tsx
<Article data-enhance="reading-progress" onScrollProgress={updateProgress}>
	<LazySection loader={<Spinner />}>
		<Paragraph>Content...</Paragraph>
	</LazySection>
</Article>
```

*Reasoning*: JavaScript-dependent functionality, direct HTML attributes, replacing base functionality, breaks progressive enhancement

**Required:**
```tsx
<Article readingProgress={true}>
	<Heading><Title>Long Article</Title></Heading>
	<Section lazyLoad={true}>
		<Paragraph>Content...</Paragraph>
	</Section>
</Article>
```

*Scope*: All components with enhancement features - props compile to data-enhance HTML attributes, enhancement is additive

## Blueprint components must enforce cryptographic signing, security scanning, and version management for community sharing

- **Rule ID**: JSX_DEVTOOLS_003
- **Description**: Blueprint components must enforce cryptographic signing, security scanning, and version management for community sharing.
- **Keywords**: jsx, devtools, blueprints, marketplace, cryptographic-signing, security-scanning, version-management, community
- **Rationale**: Ensures shared blueprints are secure, verified, and properly versioned while enabling community collaboration. Unsecured blueprint sharing exposes security vulnerabilities and breaks trust in community collaboration. Cryptographic signing, security scanning, and version management enable secure blueprint sharing.

**Prohibited:**
```tsx
<BlueprintShare community={true} validation="optional" />
```

*Reasoning*: Unsecured sharing, no cryptographic signing, no security scanning, no version management, exposes vulnerabilities

**Required:**
```tsx
<BlueprintMarketplace>
	<CommunityBlueprints>
		<CryptographicSigning algorithm="Ed25519" required={true} />
		<WardenValidation automatic={true} />
		<SecurityScanning depth="deep" />
	</CommunityBlueprints>
	<Publishing>
		<MetadataValidation schema="blueprint-v2" />
		<VersionControl semantic={true} />
	</Publishing>
</BlueprintMarketplace>
```

*Scope*: All blueprint marketplace components requiring cryptographic signing, security scanning, and version management

## Financial calculations must use proper decimal arithmetic and currency handling

- **Rule ID**: JSX_COMMERCE_002
- **Description**: Financial calculations must use proper decimal arithmetic and currency handling. All monetary amounts must specify currency and precision requirements.
- **Keywords**: jsx, commerce, financial, decimal-arithmetic, currency, precision, audit-trail, compliance
- **Rationale**: Prevents financial calculation errors and ensures compliance with currency regulations while maintaining audit trails for financial operations. Unsafe financial calculations cause monetary errors and compliance violations in financial operations. Proper decimal arithmetic and currency handling with specified currency and precision requirements prevent financial errors.

**Prohibited:**
```tsx
<PriceCalculation 
	price={29.99} 
	tax={0.0875} 
	discount={0.1} 
	total={calculateTotal(29.99, 0.0875, 0.1)} 
/>
```

*Reasoning*: Unsafe decimal arithmetic, no currency specification, no precision control, causes monetary errors, compliance violations

**Required:**
```tsx
<PriceCalculation>
	<BasePrice currency="USD" precision={2}>29.99</BasePrice>
	<Tax rate={0.0875} rounding="half-up" />
	<Discount type="percentage" value={10} />
	<Total currency="USD" precision={2} />
</PriceCalculation>
```

*Scope*: All financial calculation components requiring decimal arithmetic, currency specification, precision control, and audit trails

