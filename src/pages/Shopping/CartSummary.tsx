import React from 'react';
import { useTranslation } from 'react-i18next';

interface CartSummaryProps {
  totalQuantity: number;
  totalAmount: number;
}

export default function CartSummary({ totalQuantity, totalAmount }: CartSummaryProps) {
  const { t } = useTranslation();
  const deliveryFee = 0;
  const grandTotal = totalAmount + deliveryFee;

  return (
    <div className='lg:flex w-80 shrink-0 self-start px-2 sticky top-20 hidden'>
      <div className='w-full'>
        <div className='w-full shadow-sm rounded border border-gray-200 bg-white p-4'>
          <h3 className='block text-lg font-medium border-b border-gray-200 pb-2'>{t("shopping_cart")}</h3>
          <div className='py-2 space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='font-medium text-gray-700'>{t("quantity")}</span>
              <span className='text-purple-y-500 font-medium'>{totalAmount.toFixed(2)} m.</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-medium text-gray-700'>{t("delivery_fee")}</span>
              <span className='text-purple-y-500 font-medium'>{deliveryFee.toFixed(2)} m.</span>
            </div>
            <div className='flex justify-between items-center pt-2 border-t border-gray-200 text-base'>
              <span className='font-bold text-black'>{t("total_amount")}</span>
              <span className='text-purple-y-500 font-medium'>{grandTotal.toFixed(2)} m.</span>
            </div>
          </div>
          <div className='hidden px-1.5 pb-1 lg:block mt-2'>
            <p className='text-center text-xs text-red-500 leading-tight'>
               {t("delivery_fee_notice")}
            </p>
          </div>
        </div>
        <button className='py-3 bg-[#4bb543] font-medium w-full mt-4 text-white rounded hover:bg-[#7ed26f] transition-colors cursor-pointer shadow-sm text-center'>
          {t("go_shopping")}
        </button>
      </div>
    </div>
  );
}