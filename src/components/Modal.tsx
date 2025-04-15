import "../App.css";

type ModalProps = {
  footer?: React.ReactNode;
  body: string;
  title?: string;
  closable?: boolean;
  isOpen?: boolean;
  yesText: string;
  noText: string;
  onYes: () => void;
  onNo: () => void;
};

const Modal = ({ body, yesText, noText, onYes, onNo }: ModalProps) => {
  return (
    <>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onNo}
              >
                {noText}
              </button>
              <button type="button" className="btn btn-primary" onClick={onYes}>
                {yesText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
