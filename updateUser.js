const fs = require('fs');

// อ่านไฟล์ user.json
fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
        console.error('เกิดข้อผิดพลาดในการอ่านไฟล์:', err);
        return;
    }

    try {
        // แปลงข้อมูล JSON เป็นออบเจ็กต์ JavaScript
        let users = JSON.parse(data);
        
        // ทำการปรับปรุงข้อมูลที่นี่ตามต้องการ
        // เช่น เพิ่มผู้ใช้ใหม่, ลบผู้ใช้, หรือปรับปรุงข้อมูลของผู้ใช้ที่มีอยู่แล้ว

        // แปลงกลับเป็น JSON
        const newData = JSON.stringify(users, null, 2);

        // เขียนข้อมูลใหม่ลงในไฟล์ user.json
        fs.writeFile('user.json', newData, 'utf8', (err) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', err);
                return;
            }
            console.log('การอัปเดตข้อมูลเสร็จสมบูรณ์');
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการแปลง JSON:', error);
    }
});
