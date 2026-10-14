import{ useState } from 'react'
import { TfiViewGrid } from 'react-icons/tfi'

function Category_responsive() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className="flex flex-1 items-center justify-center gap-1 text-gray-600 h-full lg:hidden">
        <span className="mr-1"><TfiViewGrid size={18} /></span>Kategoriýalar<span></span>
      </button>
      <div className={'pt-4 pb-2 shadow px-3 lg:hidden bg-white flex flex-col w-90 max-w-full h-full z-100 top-0 -left-full fixed transition-all ' + (open ? "left-0" : "-left-full")}>
        <button onClick={() => setOpen(false)} className='w-3/5 text-red-600 top-1 right-2 absolute'>x</button>
        <div className='pt-4 pb-2 px-2 flex grow overflow-x-hidden'>
          <div className='grow overflow-x-hidden h-full'></div>
        </div>
      </div>
      <div onClick={() => setOpen(false)} className={'lg:hidden fixed w-full h-screen top-0 left-0 bg-black/50 transition-all ' + (open ? "visible opacity-100" : "invisible opacity-0")}></div>
    </>
  )
}

export default Category_responsive