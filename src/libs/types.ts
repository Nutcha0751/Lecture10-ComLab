interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  deleteTaskFunc?: (id: string) => void;
  toggleDoneTaskFunc?: (id: string) => void;
}
export type { TaskProps };

interface FooterProps {
  year?: string;
  fullName?: string;
  studentId?: string;
}
export type { FooterProps };

interface TaskInputProps {
  addTaskFunc: (title: string) => void;
}
export type { TaskInputProps };

// add UserCardDetailProps
interface UserCardDetailProps{
  email: string;
  address: string;
}
export type { UserCardDetailProps };

// add UserCardProps
interface UserCardProps {
  name: string;
  email: string;
  imgUrl: string;
  address: string;
}
export type { UserCardProps };