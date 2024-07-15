import React from 'react';
import Modal from 'react-modal';
import StockSelect from './StockSelect';

Modal.setAppElement('#overlays');

interface StockSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StockSelectModal: React.FC<StockSelectModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="modal-header">
                <h2>Select a Stock</h2>
                <button onClick={onClose} className="modal-close-btn">
                    Close
                </button>
            </div>
            <div className="modal-body">
                <StockSelect onClose={onClose} />
            </div>
        </Modal>
    );
};

export default StockSelectModal;
