import ist from "ist"
import {EditorState} from "@codemirror/state"
import {fizLanguage} from "../dist/index.js"
import {ensureSyntaxTree} from "@codemirror/language"
import {Tree} from "@lezer/common"

function s(doc: string) {
  return EditorState.create({doc, extensions: [fizLanguage]})
}

function tr(state: EditorState) {
  return ensureSyntaxTree(state, state.doc.length, 1e9)!
}

describe("fiz syntax queries", () => {
  it("returns a tree", () => {
    let state = s("x = y()"), tree = tr(state)
    ist(tree instanceof Tree)
    ist(tree.type.name, "Recipe")
    ist(tree.length, state.doc.length)
    let def = tree.resolve(2)
    ist(def.name, "Assignment")
    ist(def.from, 0)
    ist(def.to, 7)
  })

  it("keeps the tree up to date through changes", () => {
    let state = s("f")
    ist(tr(state).topNode.childAfter(0)!.name, "Alias")
    state = state.update({changes: {from: 1, insert: "()"}}).state
    ist(tr(state).topNode.childAfter(0)!.name, "Call")
  })
})