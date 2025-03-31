import clsx from "clsx";

interface ConfirmDialogProps {
  isOpen: boolean;
  onCloseEvent: (value: boolean) => void;
}

export default function ConfirmDialog({ isOpen, onCloseEvent }: ConfirmDialogProps) {
  const handleConfirm = () => {
    onCloseEvent(true);
  };

  const handleCancel = () => {
    onCloseEvent(false);
  };

  const dialogClass = clsx(
    "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300",
    {
      "opacity-0 pointer-events-none": !isOpen,
      "opacity-100": isOpen,
    }
  );

  return (
    <div className={dialogClass}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Підтвердження</h2>
        <p className="text-gray-600 mb-6">
          Ви дійсно хочете видалити всіх користувачів? Ця дія є незворотною.
        </p>
        <div className="flex items-center justify-end gap-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={handleConfirm}
          >
            Видалити
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition"
            onClick={handleCancel}
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}