export default function ConfirmDialog({
  showModal,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!showModal) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <h5>{title}</h5>
            <p>{message}</p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
