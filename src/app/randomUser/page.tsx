"use client";

import { useState } from "react";
import { cleanUser } from "@/libs/cleanUser";
import axios from "axios";
import UserCard from "@/components/UserCard";
import UserCardDetail from "@/components/UserCardDetail";
import { emit } from "process";

export default function RandomUserPage() {
  //user = null or object
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(`https://randomuser.me/api`);
    setIsLoading(false);
    const user = resp.data.results[0];

    const cleanedUser = cleanUser(user);
    setUser(cleanedUser);
  };

  //setUser({name: 'Jone', email: 'jones@gmail.com', imgUel: 'https://hello.com', address: '12345678'});
  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">User Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {
        isLoading && <p className="display-6 text-center fst-italic my-4">Loading...</p>
        // <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      }
      {/* display User information after finish loading */}
      {user && !isLoading && <UserCard {...user} />}
    </div>
  );
}

/*setIsLoading(true); – เมื่อปุ่มถูกคลิก ฟังก์ชันจะเปลี่ยนสถานะการโหลด (loading state) ให้เป็น true เพื่อแสดงว่าเริ่มต้นกระบวนการโหลดข้อมูล

const resp = await axios.get('https://randomuser.me/api'); – ฟังก์ชันนี้ใช้ axios เพื่อส่งคำขอ (request) แบบ GET ไปยัง API ของ randomuser.me เพื่อนำข้อมูลผู้ใช้แบบสุ่มกลับมา ข้อมูลจะถูกเก็บในตัวแปร resp ซึ่งเป็นการรอคำตอบจาก API (asynchronous request)

setIsLoading(false); – เมื่อได้รับข้อมูลจาก API แล้ว ฟังก์ชันจะเปลี่ยนสถานะการโหลดให้เป็น false เพื่อแสดงว่ากระบวนการโหลดเสร็จสมบูรณ์แล้ว

const user = resp.data.results[0]; – ฟังก์ชันนี้จะดึงข้อมูลของผู้ใช้คนแรกจากผลลัพธ์ที่ได้รับจาก API และเก็บไว้ในตัวแปร user

const cleanedUser = cleanUser(user); – ฟังก์ชันนี้จะเรียกฟังก์ชัน cleanUser เพื่อทำความสะอาดหรือปรับแต่งข้อมูลผู้ใช้ (เช่น กำจัดข้อมูลที่ไม่จำเป็นออก) และเก็บผลลัพธ์ในตัวแปร cleanedUser

setUser(cleanedUser); – สุดท้าย ฟังก์ชันจะใช้ setUser เพื่ออัปเดตข้อมูลผู้ใช้ที่ได้รับและทำความสะอาดแล้วให้กับสถานะ (state) ของผู้ใช้ในแอปพลิเคชัน*/