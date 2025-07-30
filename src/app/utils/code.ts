import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import ruby from "highlight.js/lib/languages/ruby";
import php from "highlight.js/lib/languages/php";
import sql from "highlight.js/lib/languages/sql";
import shell from "highlight.js/lib/languages/shell";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import kotlin from "highlight.js/lib/languages/kotlin";
import swift from "highlight.js/lib/languages/swift";
import markdown from "highlight.js/lib/languages/markdown";
import { EditorThemes } from "../types/code";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("php", php);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("markdown", markdown);

export function highlightCode(
  code: string,
  language: string,
  theme: string,
  editorThemes: EditorThemes
) {
  try {
    const highlighted = hljs.highlight(code, { language }).value;
    const currentTheme = editorThemes[theme];
    if (!currentTheme) return code;

    const themed = highlighted.replace(
      /<span class="hljs-([^"]+)">/g,
      (match, type: string) => {
        const color = (currentTheme as any)[type] || currentTheme.text;
        return `<span style="color: ${color}">`;
      }
    );
    return themed;
  } catch (error) {
    return code;
  }
}

export function getHighlightedCode(content: string, language: string) {
  if (!content) return "";
  try {
    const highlighted = hljs.highlight(content, {
      language,
    }).value;
    return highlighted;
  } catch (error) {
    return content;
  }
}

export function highlightAll() {
  hljs.highlightAll();
}
