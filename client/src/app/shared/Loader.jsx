export default function Loader({
  loaderStyle = "spinner-grow spinner-grow-sm text-light",
}) {
  return (
    <div className="text-center">
      <div className={loaderStyle} role="status"></div>
    </div>
  );
}
