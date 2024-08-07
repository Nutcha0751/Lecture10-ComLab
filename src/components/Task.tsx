import { TaskProps } from "@/libs/types";

export default function Task({
  id,
  title,
  completed,
  deleteTaskFunc,
  toggleDoneTaskFunc,
}: TaskProps) {
  const deleteBtnOnClick = () => {
    if (deleteTaskFunc !== undefined) {
      deleteTaskFunc(id);
    }
  };

  const doneBtnOnClick = () => {
    if (toggleDoneTaskFunc !== undefined) {
      toggleDoneTaskFunc(id);
    }
  };

  return (
    <div className="d-flex p-3 gap-2 align-items-center border-bottom">
      <span className={completed ? "text-decoration-line-through" : ""}>
        {title}
      </span>
      <button className="btn btn-success" onClick={doneBtnOnClick}>
        Done
      </button>
      <button className="btn btn-danger" onClick={deleteBtnOnClick}>
        Delete
      </button>
    </div>
  );
}
