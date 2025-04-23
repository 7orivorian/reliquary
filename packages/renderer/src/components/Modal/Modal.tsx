import './Modal.scss';
import {createPortal} from 'react-dom';
import {ReactNode, ReactPortal} from 'react';

export default function Modal({children, onCloseRequested}: {
    children: ReactNode;
    onCloseRequested?: () => void;
}): ReactPortal {
    const modalRoot: HTMLElement | null = document.getElementById('modal-root');
    if (modalRoot === null) {
        throw new Error('Modal root element not found');
    }
    return createPortal(
        (
            <div className="modal__overlay" onClick={() => {
                if (onCloseRequested) {
                    onCloseRequested();
                }
            }}>
                <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        ),
        modalRoot,
    );
}