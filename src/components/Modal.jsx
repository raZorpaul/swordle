import React from 'react';
import './styles/Modal.css';

export default function Modal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">

            <div className="modal-content">
                <button onClick={onClose}>&times;</button>
                <h2>{message}</h2>
            </div>
        </div>
    );
}
// export default function Modal({ isOpen, onClose, message }) {
//     if (!isOpen) return null;

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <button onClick={onClose} className="close-button">
//                     &times;
//                 </button>
//                 <h2>{message}</h2>
//             </div>
//         </div>
//     );
// }
