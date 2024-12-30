import ist from "ist";
import { describe, it } from "mocha";
import { EditorState } from "@codemirror/state";
import { fizLanguage } from "../dist/index.js";
import { ensureSyntaxTree } from "@codemirror/language";
import { Tree } from "@lezer/common";

function getState(doc: string): EditorState {
  return EditorState.create({ doc, extensions: [fizLanguage] });
}

function getTree(state: EditorState): Tree {
  return ensureSyntaxTree(state, state.doc.length, 1e9)!;
}

describe("fiz syntax queries", () => {
  it("returns a tree", () => {
    const state = getState("x = y()");
    const tree = getTree(state);
    ist(tree instanceof Tree);
    ist(tree.type.name, "Recipe");
    ist(tree.length, state.doc.length);

    const def = tree.resolve(2);
    ist(def.name, "Assignment");
    ist(def.from, 0);
    ist(def.to, 7);
  });

  it("keeps the tree up to date through changes", () => {
    let state = getState("x");
    const firstNodeName = getTree(state).topNode.childAfter(0)!.name;
    ist(firstNodeName, "RhsVariable");

    state = state.update({ changes: { from: 1, insert: "=" } }).state;
    const newFirstNodeName = getTree(state).topNode.childAfter(0)!.name;
    ist(newFirstNodeName, "Alias");
  });
});
