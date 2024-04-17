document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // หยุดการส่งฟอร์มเพื่อป้องกันการรีเฟรชหน้าเว็บ

        const email = loginForm.email.value;
        const password = loginForm.pswd.value;

        // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
        authenticateUser(email, password);
    });

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // หยุดการส่งฟอร์มเพื่อป้องกันการรีเฟรชหน้าเว็บ

        const username = signupForm.txt.value;
        const email = signupForm.email.value;
        const password = signupForm.pswd.value;

        // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
        checkDuplicateEmail(email, username, password);
    });

    function authenticateUser(email, password) {
        // อ่านข้อมูลจากไฟล์ user.json
        fetch("user.json")
            .then(response => response.json())
            .then(data => {
                // ตรวจสอบว่ามีข้อมูลผู้ใช้ใน user.json หรือไม่
                const user = data.find(user => user.email === email && user.password === password);
                if (user) {
                    alert("เข้าสู่ระบบสำเร็จ!");
                    // ตรวจสอบเส้นทางสำหรับการเข้าสู่ระบบสำเร็จ
                    window.location.href = "recipe.html"; // เปลี่ยนเส้นทางไปยังหน้า success.html
                } else {
                    checkDuplicateEmail(email);
                }
            })
            .catch(error => {
                console.error("เกิดข้อผิดพลาดในการอ่านข้อมูล:", error);
                alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
            });
    }

    function checkDuplicateEmail(email, username, password) {
        // อ่านข้อมูลจากไฟล์ user.json
        fetch("user.json")
            .then(response => response.json())
            .then(data => {
                // ตรวจสอบว่ามีอีเมลที่ซ้ำกันใน user.json หรือไม่
                const emailExists = data.some(user => user.email === email);
                if (emailExists) {
                    alert("มีอีเมลนี้อยู่ในระบบแล้ว");
                } else {
                    // ถ้าไม่มีอีเมลที่ซ้ำกัน สามารถทำการสมัครได้
                    alert("สมัครสมาชิกสำเร็จ!");
                    // สามารถทำการเพิ่มข้อมูลผู้ใช้ในฐานข้อมูลได้ต่อไปที่นี่
                }
            })
            .catch(error => {
                console.error("เกิดข้อผิดพลาดในการอ่านข้อมูล:", error);
                alert("เกิดข้อผิดพลาดในการตรวจสอบอีเมล");
            });
    }
});
