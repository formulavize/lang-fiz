import ist from "ist";
import { EditorState } from "@codemirror/state";
import { getIndentation } from "@codemirror/language";
import { fizLanguage } from "../dist/index.js";

function check(code: string) {
  return () => {
    code = /^\n*([^]*)/.exec(code)![1];
    const state = EditorState.create({ doc: code, extensions: [fizLanguage] });
    const lines = code.split("\n");
    for (let pos = 0, i = 0; i < lines.length; i++) {
      const line = lines[i];
      const indent = /^\s*/.exec(line)![0].length;
      ist(`${getIndentation(state, pos)} (${i + 1})`, `${indent} (${i + 1})`);
      pos += line.length + 1;
    }
  };
}

describe("fiz indentation", () => {
  it(
    "indents arg list",
    check(`
foo(
  bar,
  baz
)
`),
  );

  it(
    "indents nested calls",
    check(`
one(
  two(
    three()
  )
)
`),
  );

  it(
    "indents style arg lists",
    check(`
f(){
  a: 1,
  b: 2
}
`),
  );
});
