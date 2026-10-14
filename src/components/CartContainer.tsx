import { Link } from 'react-router-dom';
import Cart from './Cart';
import type { productT } from '../types/productT';
import type { dataT } from '../types/dataT';

function CartContainer({ title, link, Style, data }: { title: string, link?: number, Style?: string, data: productT[] }) {
  return (
    <div className='w-full'>
      <section className={Style}>
        <div className='flex mx-auto'>
          <h2 className='font-bold text-2xl ml-1.5'></h2>
          {
            link ?
              <Link to={`category/${link}`} className='flex mb-3 hover:text-purple-y-500 font-bold text-2xl ml-1.5'>
                {title}
              </Link> :
              <h1 className='flex mb-3 font-bold text-2xl ml-1.5'>
                {title}
              </h1>
          }
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:[&>*:nth-child(4)]:hidden lg:[&>*:nth-child(4)]:block`}>
          {data?.length>0 && data.length > 0 ? (
            data.map((product: productT) => (
              <Cart key={Number(product?.id)} data={product as unknown as dataT} />
            ))
          ) : (
            <>
              <div>Haryt yok</div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default CartContainer