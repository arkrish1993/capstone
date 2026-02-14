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
          <div className="modal-content">
            <div className="modal-header text-light bg-dark bg-gradient p-3">
              <h5 className="modal-title">{title}</h5>
            </div>
            <p className="p-3">{message}</p>
            <div className="modal-footer text-light bg-dark bg-gradient px-3">
              <button
                className="btn btn-secondary btn-sm me-2"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button className="btn btn-danger btn-sm" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
