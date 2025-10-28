# Cross-Library Testing Strategy for Studio

> **Every boundary tested. Every interaction verified. Every contract proven.**

## Philosophy

Testing in Studio isn't about mocking boundaries—it's about **exercising real integrations** with declarative test scenarios that become part of our data model. Since everything is data (JSX → IR → JSON/YAML/Turtle), our tests are also data, stored in the triple store, versioned, and tradeable.

## The Three-Layer Testing Architecture

### Layer 1: Contract Testing (Boundaries)

Every library exposes contracts that other libraries depend on. These are **cryptographically verified** by Warden and **property-tested** by Auditor.

#### Implementation

```tsx
// libraries/artificer/contracts/calculation-engine.contract.tsx
<Contract
  library="@sitebender/artificer"
  provides="calculation-engine"
  version="1.0.0"
>
  <Interface>
    <Function name="composeOperators">
      <Signature>(operand: OperandIR) => (arg: unknown) => Promise<Either<Error[], unknown>></Signature>
      <Properties>
        <Pure />
        <Associative />
        <TypeSafe />
      </Properties>
      <Invariants>
        <Invariant>Calculation order preserves mathematical precedence</Invariant>
        <Invariant>Errors accumulate without short-circuiting</Invariant>
      </Invariants>
    </Function>
  </Interface>
  
  <TestScenarios>
    <Scenario id="formulator-integration">
      <Given>
        <FormulaString>price * quantity * (1 + tax_rate)</FormulaString>
      </Given>
      <When>
        <ParseWith library="@sitebender/formulator" />
        <CompileToIR />
        <ExecuteWith library="@sitebender/artificer" />
      </When>
      <Then>
        <CalculationCascades />
        <ResultMatches expected={42.84} />
      </Then>
    </Scenario>
  </TestScenarios>
</Contract>
```

Auditor automatically:
- Generates property tests from invariants
- Verifies contracts haven't changed (SHA-256 hash)
- Tests all scenarios with generated data from Quarrier
- Produces proofs of correctness

### Layer 2: Integration Testing (Workflows)

Real workflows that exercise multiple libraries together, stored as data in the triple store.

#### Implementation

```tsx
// tests/integration/reactive-form-workflow.test.tsx
<IntegrationTest
  name="Reactive Form with Live Validation"
  libraries={["architect", "artificer", "formulator"]}
>
  <Setup>
    <TripleStore>
      <LoadSchema from="./schemas/user-form.shacl" />
    </TripleStore>
  </Setup>
  
  <Workflow>
    <Step name="Render form from data schema">
      <PagewrightRenders>
        <Form id="user-form">
          <Input id="age" type="number" />
        </Form>
      </PagewrightRenders>
    </Step>
    
    <Step name="Attach validation from SHACL">
      <ArchitectAttaches>
        <Validation target="#age">
          <FromShacl shape="AgeShape" />
        </Validation>
      </ArchitectAttaches>
    </Step>
    
    <Step name="User enters invalid value">
      <SimulateInput target="#age" value="150" />
    </Step>
    
    <Step name="Validation cascades">
      <AssertValidation target="#age" status="invalid" />
      <AssertErrorMessage contains="must be less than 120" />
    </Step>
    
    <Step name="Parse formula for calculated field">
      <FormulatorParses formula="age * 365.25" />
      <ArchitectCalculates target="#days-alive" />
    </Step>
  </Workflow>
  
  <Assertions>
    <NoMemoryLeaks />
    <AllEventsCaptured />
    <PerformanceUnder milliseconds={16} />
  </Assertions>
</IntegrationTest>
```

These tests:
- Run in real browsers via the-workshop
- Record all events to triple store for replay
- Can be debugged with time-travel
- Generate performance metrics for Envoy

### Layer 3: System Testing (End-to-End)

Complete application scenarios that test the entire stack.

#### Implementation

```tsx
// tests/system/distributed-collaboration.test.tsx
<SystemTest
  name="Multi-User CRDT Collaboration"
  environment="distributed"
>
  <Actors>
    <Actor id="alice" location="browser-1" />
    <Actor id="bob" location="browser-2" />
    <Actor id="charlie" location="deno-runtime" />
  </Actors>
  
  <InitialState>
    <DistributedCounter id="votes" value={0} />
    <OrSet id="participants" members={[]} />
    <CollaborativeText id="document" content="" />
  </InitialState>
  
  <Timeline>
    <At time="0ms">
      <Actor ref="alice">
        <IncrementCounter id="votes" />
        <AddToSet id="participants" value="alice" />
      </Actor>
    </At>
    
    <At time="10ms">
      <Actor ref="bob">
        <IncrementCounter id="votes" />
        <AddToSet id="participants" value="bob" />
      </Actor>
    </At>
    
    <At time="15ms">
      <NetworkPartition between={["alice", "bob"]} duration="100ms" />
    </At>
    
    <At time="20ms">
      <Actor ref="alice">
        <TypeText id="document" position={0} text="Hello " />
      </Actor>
      <Actor ref="bob">
        <TypeText id="document" position={0} text="World " />
      </Actor>
    </At>
    
    <At time="120ms">
      <NetworkHeals />
    </At>
    
    <At time="150ms">
      <AssertEventually>
        <Counter id="votes" equals={2} />
        <Set id="participants" contains={["alice", "bob"]} />
        <Text id="document" satisfies="contains both Hello and World" />
      </AssertEventually>
    </At>
  </Timeline>
  
  <ChaosMonkey>
    <RandomLatency min="5ms" max="50ms" />
    <PacketLoss probability={0.1} />
    <ReorderMessages probability={0.2} />
  </ChaosMonkey>
</SystemTest>
```

## Test Data Generation

Quarrier generates test data that respects all constraints:

```tsx
<TestDataGenerator>
  <FromShacl shapes="./schemas/*.shacl">
    <GenerateValid count={100} />
    <GenerateInvalid count={50} />
    <GenerateEdgeCases />
  </FromShacl>
  
  <FromOwl ontologies="./ontologies/*.owl">
    <GenerateConsistent />
    <GenerateInconsistent />
  </FromOwl>
  
  <Strategies>
    <Shrinking algorithm="binary-search" />
    <Coverage target="branch" minimum={100} />
    <Fuzzing rounds={1000} />
  </Strategies>
</TestDataGenerator>
```

## Test Execution & Orchestration

### Parallel Execution

```tsx
<TestOrchestrator>
  <ParallelStreams max={8}>
    <Stream name="unit" pattern="**/*.unit.test.tsx" />
    <Stream name="integration" pattern="**/*.integration.test.tsx" />
    <Stream name="system" pattern="**/*.system.test.tsx" />
  </ParallelStreams>
  
  <DependencyOrder>
    <RequirePass library="toolsmith" before="all" />
    <RequirePass library="warden" before="all" />
    <Parallel libraries={["architect", "artificer", "formulator"]} />
  </DependencyOrder>
</TestOrchestrator>
```

### Continuous Verification

```tsx
<ContinuousVerification>
  <OnChange>
    <RunAffected radius={2} />
    <VerifyContracts />
    <CheckPerformance baseline="main" />
  </OnChange>
  
  <OnCommit>
    <RunAll />
    <GenerateCoverage />
    <ProveProperties />
  </OnCommit>
  
  <OnMerge>
    <FullSystemTests />
    <ChaosTests duration="10m" />
    <LoadTests users={1000} />
  </OnMerge>
</ContinuousVerification>
```

## Test Observability

All test execution flows through Envoy for complete observability:

```tsx
<TestObservability>
  <Metrics>
    <Duration percentiles={[50, 90, 99]} />
    <Flakiness window="30d" />
    <Coverage lines={true} branches={true} />
  </Metrics>
  
  <Visualization>
    <DependencyGraph />
    <HeatMap of="execution-time" />
    <Timeline of="test-execution" />
  </Visualization>
  
  <Replay>
    <SaveTo format="triple-store" />
    <EnableTimeTravel />
    <ShareVia ipfs={true} />
  </Replay>
</TestObservability>
```

## Implementation Phases

### Phase 1: Contract Foundation (Week 1)
- [ ] Define contract schema in SHACL
- [ ] Implement contract verification in Warden
- [ ] Generate contract tests in Auditor
- [ ] Add contract registry to triple store

### Phase 2: Integration Framework (Week 2)
- [ ] Build TestHarness meta-component
- [ ] Implement workflow executor
- [ ] Add assertion library
- [ ] Create timeline controller

### Phase 3: System Testing (Week 3)
- [ ] Implement multi-actor orchestration
- [ ] Add network simulation
- [ ] Build chaos engineering tools
- [ ] Create load testing framework

### Phase 4: Observability (Week 4)
- [ ] Connect to Envoy metrics
- [ ] Build test dashboard
- [ ] Implement replay engine
- [ ] Add performance regression detection

## Benefits

1. **No Mock Drift**: Contracts are verified cryptographically
2. **Real Integration Testing**: Actual libraries working together
3. **Time-Travel Debugging**: Every test execution can be replayed
4. **Distributed Testing**: Test CRDTs and P2P naturally
5. **Performance Built-in**: Every test measures performance
6. **Declarative**: Tests are data, not code
7. **AI-Friendly**: LLMs can easily generate test scenarios

## Example: Testing Artificer + Formulator Integration

```tsx
<ContractTest
  consumer="@sitebender/artificer"
  provider="@sitebender/formulator"
  contract="formula-to-ir"
>
  <PropertyTest name="Isomorphism">
    <ForAll formula={<GenerateFormula />}>
      <Assert>
        {(formula) => {
          const ir = parseFormula(formula)
          const decompiled = decompileIR(ir)
          const reparsed = parseFormula(decompiled)
          return deepEqual(ir, reparsed)
        }}
      </Assert>
    </ForAll>
  </PropertyTest>
  
  <ExampleTest name="Tax calculation">
    <Given formula="price * quantity * (1 + tax_rate)" />
    <When compiled={true} executed={true} />
    <Then resultMatches={<Calculate price={10} quantity={4} tax_rate={0.08} />} />
  </ExampleTest>
</ContractTest>
```

This test:
- Verifies the contract between libraries
- Tests with generated data
- Proves properties mathematically
- Can be replayed infinitely
- Generates documentation automatically

## Conclusion

This testing strategy ensures every library interaction is verified, every boundary is tested, and every contract is proven. By making tests declarative data, we enable:

- Perfect reproducibility
- Time-travel debugging
- Distributed testing
- AI-assisted test generation
- Continuous property verification

Tests become first-class citizens in our data model, as important as the code they verify.
