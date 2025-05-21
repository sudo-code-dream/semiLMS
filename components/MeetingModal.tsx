// components/NumberSelectionModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NumberSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (number: number) => void;
}

const NumberSelectionModal = ({ isOpen, onClose, onSelect }: NumberSelectionModalProps) => {
    const numbers = Array.from({ length: 6 }, (_, i) => i + 7); // Creates array [7,8,9,10,11,12]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select a Number</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 p-4">
                    {numbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => onSelect(number)}
                            className="p-4 text-lg font-medium rounded-lg bg-card hover:bg-card/80 border"
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NumberSelectionModal;