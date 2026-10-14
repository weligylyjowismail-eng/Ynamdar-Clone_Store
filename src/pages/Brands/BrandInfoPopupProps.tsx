import { FiX, FiMessageSquare } from 'react-icons/fi'
import Popup from '../../components/Popup'
import { useTranslation } from 'react-i18next'

interface BrandInfoPopupProps {
  open: boolean
  setOpen: (open: boolean) => void
  brandName?: string
  brandImage: string
}

function BrandInfoPopup({ open, setOpen, brandName, brandImage }: BrandInfoPopupProps) {
  const { t } = useTranslation()

  return (
    <Popup open={open} setOpen={setOpen}>
      <div className='relative h-auto w-[18rem] rounded-lg bg-white shadow-lg outline-none'>
        <button
          onClick={() => setOpen(false)}
          className='text-red-500 hover:text-red-400 active:text-error-600 disabled:text-red-700/80 flex h-5 w-5 items-center justify-center transition-colors duration-200 disabled:cursor-default absolute right-2 top-2'
        >
          <FiX className="text-xl" />
        </button>
        <div className='p-4'>
          <div className='mb-4 flex w-full justify-center divide-x divide-gray-400'>
            <div className='pr-3'>
              <div className='h-full w-16'>
                <div className='relative overflow-hidden rounded-lg border border-gray-400 pt-[75%]'>
                  <div className='h-full w-full absolute left-0 top-0'>
                    <img 
                      src={brandImage} 
                      className='absolute left-0 top-0 z-2 h-full w-full object-cover transition-opacity duration-200' 
                      alt={brandName || "Brand logo"} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-grow self-stretch pl-3 pt-2'>
              <h2 className='text-base font-bold leading-none'>
                {brandName}
              </h2>
            </div>
          </div>
          <div className='flex flex-col gap-y-3'>
            <button className='flex h-9 items-center rounded-lg bg-gray-200 px-2.5 py-1.5 hover:bg-gray-300 transition-colors duration-200'>
              <span className='mr-2 flex w-6 items-center justify-center'>
                <FiMessageSquare className="text-lg text-black" />
              </span>
              <span className='flex flex-grow items-center p-1 text-sm leading-none text-gray-800 font-medium'>
                {t("contact_btn")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default BrandInfoPopup