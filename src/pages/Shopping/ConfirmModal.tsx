import React from 'react';
import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popup';

interface ConfirmModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  setOpen,
  message,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Popup open={open} setOpen={setOpen}>
      <div className="outline-none shadow-lg bg-white rounded h-auto">
        <div className="pt-6 pb-4 px-4">
          <p className="pr-4">{message}</p>
          <div className="mt-2 py-1">
            <div className="flex justify-end pt-1">
              <button
                onClick={handleConfirm}
                className="duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-[#4bb543] rounded mx-1 cursor-pointer hover:bg-[#7ed26f]"
              >
                {confirmText || t('Yes')}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-red-600 rounded mx-1 cursor-pointer hover:bg-[#ff503f]"
              >
                {cancelText || t('No')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmModal;