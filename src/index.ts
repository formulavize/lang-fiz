import {parser} from "lezer-fiz"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const fizLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        ArgList: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        ArgList: foldInside,
        BlockComment(tree) { return {from: tree.from + 2, to: tree.to - 2} }
      }),
      styleTags({
        Variable: t.variableName,
        Call: t.function(t.variableName),
        LineComment: t.lineComment,
        BlockComment: t.blockComment,
        "( )": t.paren,
        ", ;": t.separator,
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["("]},
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
  }
})

export function fiz() {
  return new LanguageSupport(fizLanguage)
}
