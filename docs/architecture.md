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

We are grouping our application by route/module from the start. This is a structure that supports change and growth. If it’s based on components and containers that will happen too fast.

We also have a common module, we will be putting components like buttons, inputs, and cards in here. t helps to avoid duplication. You don’t want everyone on the team to make their own version of the same component.

Absolute paths mean that you will have to change less if you need to move a component. Also it makes it easier to find out where everything is getting pulled from. Use absolute paths with the `@` prefix.

## State management

## Style components

When it comes to CSS-in-JS components it’s normal to have multiple ones in the same file. Ideally we’d like to keep them in the same file as the regular component that uses them.

However, if they become too lengthy, as styles can get, extract them in their own file living next to the component that uses them.

## Data fetching

Use react-query for data fetching. It makes communicating with a server a natural part of the component lifecycle in an idiomatic way - a hook.

It comes with caching built in and manage loading and error states for us. We just need to handle them. Also, it removes the need to use a state management library to handle that data.
