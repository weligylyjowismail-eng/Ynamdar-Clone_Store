import { useEffect, type ReactNode, type RefObject } from 'react'

function OutClick({children,callback,ref}:{children:ReactNode,callback:()=>void,ref:RefObject<HTMLDivElement | null>}) {
  useEffect(()=>{
    const handleClick = (e:MouseEvent)=>{
      if(ref.current && !ref.current.contains(e.target as Node)){
        callback()
      }
    }
    document.addEventListener("mousedown",handleClick)
    return ()=> document.removeEventListener("mousedown",handleClick)
  },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default OutClick