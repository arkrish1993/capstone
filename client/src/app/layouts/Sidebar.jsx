import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="bg-success bg-gradient text-white p-4 vh-100 position-fixed"
      style={{ width: 200 }}
    >
      <h5>Heading</h5>
      <ul className="nav flex-column">
        <li>
          <Link className="nav-link text-white" to="/">
            Link
          </Link>
        </li>
      </ul>
    </div>
  );
}
