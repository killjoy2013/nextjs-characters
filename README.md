## Getting Started

Deployed application [https://nextjs-characters.vercel.app/](https://nextjs-characters.vercel.app)

Screencast to display the usage [https://drive.google.com/file/d/1grIdS6k6eHftfUG-0BnvV6JWD_Gnl1s1/view?usp=sharing](https://drive.google.com/file/d/1grIdS6k6eHftfUG-0BnvV6JWD_Gnl1s1/view?usp=sharinghttps:/)

This project is created with

```json
node v20.12.0
npm 10.5.0
```

You can run with commands

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About Dropdown component

- We used Redux Toolkit to manage state.
- http requests are sent with RTK Query.
- Dropdown component is created as a generic component. It has no dependency to character data structure and can be used with a different api & its data structure.
- We created a `useCharacter` hook to encapsulate the logic related to Redux state.
- When we need to use this component with any other source api, we just need to create a similar hook, like `useProducts` and define the shape of the Row to display.

## Using the Dropdown component

It can be used in two ways; with mouse or keyboard.

## Keyboard shortcuts:

- Cursor down => open dropdown & change focus to character list & navigate downwards
- Escape => close dropdown
- Cursor up => navigate upwards & when on the top of the list, focus on the input
- spacebar => toggle selection on the list
- Shift + Cursor Up => scroll the list to top & focus on the input

## when the focus on the input;

- Shift + Cursor Left => Focus on first selected item
- Cursor Left & Cursor Right => navigate among selected items
- Spacebar => remove item from selection
