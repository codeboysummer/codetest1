import React, { useState } from "react";
import "../src/App.css";
interface Task {
  id: string;
  name: string;
  status: string;
  image: any;
  time: string;
  days: string;
  done?: boolean;
  newOrder?: boolean;
}

interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  const [state, setState] = useState<Task[]>(tasks);

  const onDragStart = (evt: React.DragEvent<HTMLDivElement>, id: string) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", id.toString());
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt: React.DragEvent) => {
    let currentTarget = evt.currentTarget as Element;
    let newTarget = evt.relatedTarget as Element;
    if (newTarget?.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget as Element;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt: React.DragEvent<HTMLDivElement>, status: string) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updated = state.map((task) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setState(updated);
  };

  let pending = state.filter((data) => data.status === "In Progress");
  let done = state.filter((data) => data.status === "Completed");
  let newOrder = state.filter((data) => data.status === "New Order");
  let waiting = state.filter((data) => data.status === "Delivered");
  return (
    <div className="container">
      <div
        className="order small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "New Order")}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4>Todo List</h4>
                <button style={{ width: "100%" }}>+</button>
                {newOrder.map((task) => (
                  <div
                    className="card"
                    key={task.name}
                    id={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <div className="img">
                      <img src={task.image} alt="box" />
                    </div>
                    <div className="card_right">
                      <div className="status">{task.status}</div>
                      <div className="days">{task.time}</div>
                      <div className="time">{task.days}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="pending small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "In Progress")}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4>In Progress</h4>
                <button style={{ width: "100%" }}>+</button>
                {pending.map((task) => (
                  <div
                    className="card"
                    key={task.name}
                    id={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <div className="img">
                      <img src={task.image} alt="box" />
                    </div>
                    <div className="card_right">
                      <div className="status">{task.status}</div>
                      <div className="days">{task.time}</div>
                      <div className="time">{task.days}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className="done small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "Completed")}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4>Completed</h4>
                <button style={{ width: "100%" }}>+</button>
                {done.map((task) => (
                  <div
                    className="card"
                    key={task.name}
                    id={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <div className="img">
                      <img src={task.image} alt="box" />
                    </div>
                    <div className="card_right">
                      <div className="status">{task.status}</div>
                      <div className="days">{task.time}</div>
                      <div className="time">{task.days}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaskList;
