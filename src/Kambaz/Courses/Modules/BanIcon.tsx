import { FaBan, FaCircle } from "react-icons/fa6";

export default function BanIcon() {
  return (
    <span className="me-2 position-relative">
        <FaBan style={{ top: "2px", color: "gray" }} className="me-1 position-absolute fs-5" />
        <FaCircle className="text-white me-1 fs-6" />
    </span>
  );
}