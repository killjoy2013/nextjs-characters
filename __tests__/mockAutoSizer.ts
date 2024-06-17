jest.mock(
  "react-virtualized-auto-sizer",
  () =>
    ({ children }: any) =>
      children({ height: 600, width: 600 })
);
