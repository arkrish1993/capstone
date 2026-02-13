export default function ErrorAlert({ alertMessage, onDismiss }) {
  return (
    <div className="alert alert-danger alert-dismissible fixed-top fade show p-4 inline">
      {alertMessage}
      <button
        type="button"
        className="btn-close mt-2 me-2"
        onClick={onDismiss}
      ></button>
    </div>
  );
}
