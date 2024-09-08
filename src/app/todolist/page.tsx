"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Task from "@/components/Task";
import TaskInput from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

//import { TaskType } from "@/libs/types";
import { TaskProps } from "@/libs/types";

export default function Todolist() {
  //tasks = array of {id: string, title: string, complete: boolean}
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  //create 1st load state variable
  const [isLoading, setIsLoading] = useState(true); //เป็นการ load ครั้งแรกใช่ไหม

  //add useEffect runs at first and after tasks is updated
  useEffect(() => { //(ใช้เพื่อตรวจสอบการเปลี่ยนแปลงของ tasks และบันทึกลงใน localStorage.)
    if(isLoading){ //เป็นการช่วยเก็บข้อมูลเวลารีหน้า page
      setIsLoading(false);
      return;
    };
    const jsonStr = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonStr);
  },[tasks]); //ตัวแรกหรือก่อน , คือ callback ส่วนหลัง , คือ array
  
  useEffect(() => { //(ใช้เพื่อโหลดข้อมูล tasks ที่เก็บไว้ใน localStorage เมื่อหน้าเพจถูกโหลดขึ้นมาใหม่ เพื่อให้แน่ใจว่าผู้ใช้จะเห็นข้อมูล tasks ล่าสุดแม้ว่ารีเฟรชหน้าเพจ.)
    const jsonStr = localStorage.getItem("tasks");
    if(jsonStr !== null){
      const newTask = JSON.parse(jsonStr);
      setTasks(newTask);
    };
  },[]);

  // add new task with specified title
  const addTask = (newTaskTitle: string) => {
    const newTask:TaskProps = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  // delete a task by task id
  const deleteTask = (taskId: string) => {
    // const newTasks = tasks.filter((task) => task.id !== taskId);
    // setTasks(newTasks);

    // Using "functional update form" of setTasks
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => { //ขีดเส้นว่าอันไหนทำแล้ว
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks);

    //search for a task based on condition
    const task = newTasks.find((x) => x.id === taskId);

    if (task !== undefined) {
      task.completed = !task.completed;
      setTasks(newTasks);
    }
  };

  const doneLength = tasks.filter((task) => task.completed).length;

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({tasks.length}) Done ({doneLength})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task //สิ่งที่จะแสดงขึ้นมา
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2023" fullName="Chayanin Suatap" studentId="650610560" />
    </div>
  );
}
