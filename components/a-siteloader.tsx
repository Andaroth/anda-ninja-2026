
import { FC, useState, useEffect } from "react"

import { themeNameType } from "@/store/global"

interface ASiteLoaderProps {
  visible: boolean
  theme?: themeNameType
}

const ASiteLoader: FC<ASiteLoaderProps> = ({ visible, theme }: ASiteLoaderProps = { visible: true, theme: "default" }) => {
  const loadingConst = "Chargement".split('')
  const [index, setIndex] = useState(0)

  const [matrix, setMatrix] = useState<string>("")

  const addChar = (index: number) => {
    if (matrix.length >= loadingConst.length) setMatrix("")
    else setMatrix(matrix + loadingConst[index])
  }
  useEffect(() => {
    setTimeout(() => {
      addChar(index)
      if (index < loadingConst.length) setIndex(index + 1)
      else setIndex(0)
    }, 200)
  }, [matrix])

  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "initial"
  }, [visible])

  return visible ? <aside style={{
    position: "fixed",
    top: "0px",
    left: "0px",
    pointerEvents: 'none',
    opacity: visible ? 1 : 0,
    backgroundColor: '#000',
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: "0",
    margin: "0",
    maxWidth: "none",
    zIndex: "250",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden"
  }}>

    <aside style={{ display: "flex" }}>
      <aside style={{ margin: "0 auto", display: "flex", flexDirection: "column" }}>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>          .                                                      .</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>        .n                   .                 .                  n.</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>  .   .dP                  dP                   9b                 9b.    .</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}> 4    qXb         .       dX     <span style={{ color: "white" }}>ANDA PIRATE</span>     Xb       .        dXp     t</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>dX.    9Xb      .dXb    __                         __    dXb.     dXP     .Xb</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>9XXb._       _.dXXXXb dXXXXbo.                 .odXXXXb dXXXXb._       _.dXXP</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}> 9XXXXXXXXXXXXXXXXXXXVXXXXXXXXOo.           .oOXXXXXXXXVXXXXXXXXXXXXXXXXXXXP</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>  `9XXXXXXXXXXXXXXXXXXXXX'~   ~`OOO8b   d8OOO'~   ~`XXXXXXXXXXXXXXXXXXXXXP'</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>    `9XXXXXXXXXXXP' `9XX'          `98v8P'          `XXP' `9XXXXXXXXXXXP'</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>        ~~~~~~~       9X.          .db|db.          .XP       ~~~~~~~</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                        )b.  .dbo.dP'`v'`9b.odb.  .dX(</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                      ,dXXXXXXXXXXXb     dXXXXXXXXXXXb.</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                     dXXXXXXXXXXXP'   .   `9XXXXXXXXXXXb</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                    dXXXXXXXXXXXXb   d|b   dXXXXXXXXXXXXb</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                    9XXb'   `XXXXXb.dX|Xb.dXXXXX'   `dXXP</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                     `'      9XXXXXX(   )XXXXXXP      `'</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                              XXXX X.`v'.X XXXX</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                              XP^X'`b   d'`X^XX</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                              X. 9  `   '  P )X</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                              `b  `       '  d'</pre>
        <pre style={{ fontSize: "1em", color: theme === "red" ? "#F00" : "#0F0", margin: "0" }}>                               `             '</pre>
        <pre>                               $&gt; {matrix}█</pre>
      </aside>
    </aside>


  </aside> : ''
}

export default ASiteLoader