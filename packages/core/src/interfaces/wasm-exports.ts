export interface CssWasmExports extends WebAssembly.Exports {
  cdx: CallableFunction;
  rdx: CallableFunction;
  bdx: CallableFunction;
  ndx: CallableFunction;
  mdx: CallableFunction;
}
