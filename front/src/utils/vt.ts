import { flushSync } from "react-dom";

export function vt(cb: () => void){
    document.startViewTransition?.(()=> flushSync(cb)) || cb()
}