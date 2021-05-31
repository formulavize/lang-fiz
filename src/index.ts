import {parser} from "lezer-fiz"
import {LezerLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const fizLanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        ArgList: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        ArgList: foldInside
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
