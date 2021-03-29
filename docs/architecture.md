# Architecture

## Libraries

- [stitches](https://stitches.dev/): CSS-in-JS
- [react-query](https://react-query.tanstack.com/): Data fetching

## Folder structure

```
•
├── modules
│     ├── app
│     ├── common
│     │     ├── utils
│     │     └── components
│     │           └── Button
│     │                ├── Button.tsx
│     │                └── index.ts
│     │
│     └── login
│           ├── Login.tsx
│           └── index.ts
│
├── types
└── main.tsx
```

We are grouping our application by route/module from the start. This is a structure that supports change and growth. The point is not to have the application outgrow the architecture quickly. If it’s based on components and containers that will happen too fast.

We also have a common module, we will be putting components like buttons, inputs, and cards in here. t helps to avoid duplication. You don’t want everyone on the team to make their own version of the same component.

Absolute paths mean that you will have to change less if you need to move a component. Also it makes it easier to find out where everything is getting pulled from. Use absolute paths with the `@` prefix.

## Data fetching

Use react-query for data fetching. It makes communicating with a server a natural part of the component lifecycle in an idiomatic way - a hook.

It comes with caching built in and manage loading and error states for us. We just need to handle them. Also, it removes the need to use a state management library to handle that data.

## State management

### Use local state

In most cases you don’t need a state management library, `useState` can go a long way. In case we really need global state consider `useReducer` and React’s Context.

### Use reducers

Sometimes you need a more powerful way to express and manage state changes. Start with useReducer before you reach for an external library. This is a great mechanism to do complex state management and it doesn’t require 3rd party dependencies.

## Style components

When it comes to CSS-in-JS components it’s normal to have multiple ones in the same file. Ideally we’d like to keep them in the same file as the regular component that uses them.

However, if they become too lengthy, as styles can get, extract them in their own file living next to the component that uses them.
