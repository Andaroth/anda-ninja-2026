import { FC, useEffect, useState } from "react"
import cn from "classnames"

interface ACodeProps {
  code: string
  lang?: "txt" | "html" | "css" | "js" | "json" | "py" | "php" | "c" | "cpp" | "h"
  className?: string
}

const ACode: FC<ACodeProps> = (props: ACodeProps) => {
  const { code, className, lang = "txt" } = props

  // const [formatedContent, setFormatedContent] = useState(code)

  // useEffect(() => {
  //   const process = (str: string) => {
  //     var div = document.createElement('div');
  //     div.innerHTML = str.trim();
  //     return format(div, 0).innerHTML;
  //   }

  //   const format = (node: any, level: number) => {
  //     var indentBefore = new Array(level++ + 1).join('  '),
  //       indentAfter = new Array(level - 1).join('  '),
  //       textNode: any;

  //     for (var i = 0; i < node.children.length; i++) {
  //       textNode = document.createTextNode('\n' + indentBefore);
  //       node.insertBefore(textNode, node.children[i]);

  //       format(node.children[i], level);

  //       if (node.lastElementChild == node.children[i]) {
  //         textNode = document.createTextNode('\n' + indentAfter);
  //         node.appendChild(textNode);
  //       }
  //     }
  //     return node;
  //   }

  //   setFormatedContent(lang == "html" ? process(code) : code)
  // }, [])


  return <pre><code className={cn("flex w-full p-0", className)}>{code}</code></pre>
}

export default ACode