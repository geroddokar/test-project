import clsx from "clsx";

interface WaitingDialogProps {
    isOpen: boolean;
}


export default function WaitingDialog({ isOpen }: WaitingDialogProps) {

    const dialogClass = clsx('fixed inset-0 flex items-center justify-center z-50', {
        'hidden':!isOpen,
    })
    return (
        <div id="waitingDialog" className={dialogClass}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                    <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} fill="none" />
                    </svg>
                </div>
                <p className="text-lg text-gray-700">Зачекайте...</p>
            </div>
        </div>
    )
}