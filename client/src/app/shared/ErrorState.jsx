export default function ErrorState({
  message = "Something went wrong. Please try again.",
}) {
  return <div className="alert alert-danger text-center my-3">{message}</div>;
}
