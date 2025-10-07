# Initial plan for a proof of concept

This document outlines the initial plan for developing a proof of concept (PoC) for the Architect library. The goal of this PoC is to demonstrate the core functionalities and validate the feasibility of the proposed architecture.

## The goal

The primary goal of this PoC is to create a minimal yet functional version of the Architect library that showcases its ability to manage and orchestrate complex systems. This includes demonstrating key features such as modularity, scalability, and ease of integration with existing systems. We will do this step by step.

To this end, we will create a small demo application.

## The JSX DSL

The demo application will utilize a JSX-based Domain Specific Language (DSL) to define its architecture. This DSL will allow developers to describe the components and their interactions in a clear and concise manner, leveraging the familiar syntax of JSX.

Here is the JSX DSL that we will use for the demo application:

```jsx
<Calculation type="Integer">
  <Add>
    <Augend>
      <FromLocalStorage key="a" />
    </Augend>
    <Addend>
      <Multiply>
        <Multiplicand>
          <FromLocalStorage key="b" />
        </Multiplicand>
        <Multiplier>
          <FromLocalStorage key="c" />
        </Multiplier>
      </Multiply>
    </Addend>
  </Add>
</Calculation>
```

This DSL snippet represents a calculation that adds a large integer to the product of another large integer and 2. The structure is hierarchical, with each operation and value clearly defined. The `type` attribute in the `Calculation` component specifies that we are working with the branded BigInteger type.

The first step will be to parse this JSX structure and convert it into an Abstract Syntax Tree (AST) that can be processed by the Architect library. This means parsing it first to an IR, and then to an AST. These are NOT HTML elements and never will be. The goal is to have a clear and unambiguous representation of the calculation that can be easily manipulated and analyzed. And, more importantly, used to compose a function that performs the calculation.

There are integer arithmetic functions in the Toolsmith library: `libraries/toolsmith/src/newtypes/numericTypes/integer/`. We need to use these functions to perform the actual calculations. But there is a twist. The <FromLocalStorage> components are not just placeholders for values; they represent asynchronous operations that fetch data from local storage. This means that our calculation function needs to be asynchronous as well. Furthermore, the nested functions need to be composed in a way that respects the asynchronous nature of these operations, meaning thunks.

So there are several challenges to address:

1. How do we parse the JSX DSL into an AST?
2. How do we handle the asynchronous nature of the <FromLocalStorage> components?
3. How do we compose the functions to perform the calculation correctly?
4. How do we ensure that the final function is efficient and maintains the integrity of the data types?
