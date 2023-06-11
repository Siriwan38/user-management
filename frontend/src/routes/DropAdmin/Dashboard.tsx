import Toast from "react-bootstrap/Toast";
import Breadcrumb from "../../components/Breadcrumbs";

const paths = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Dashboard", url: "/dropdown/dashboard" },
];

function BasicExample() {
  return (
    <div>
      <Breadcrumb paths={paths} />
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">CAI</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>งานเสร็จยังคะ.</Toast.Body>
      </Toast>
    </div>
  );
}

export default BasicExample;
