import { type ReactNode } from 'react'

function Popup({children,open,setOpen}:{children:ReactNode,open:boolean,setOpen:(open:boolean)=>void}) {
  return (
    <div>
        <div onClick={()=>setOpen(false)} className={'bg-black/30 h-screen w-full fixed top-0 left-0 z-10 transition-all '+(open ? "visible opacity-100" : "invisible opacity-0")}></div>
        <div className={'fixed z-11 top-1/2 left-1/2 -translate-1/2 transition-all ' +(open ? "" : "scale-0")}>{children}</div>
    </div>
  )
}

export default Popup