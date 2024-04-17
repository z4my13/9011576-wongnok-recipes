const fs = require('fs');

// อ่านข้อมูล user.json
fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
        console.error('เกิดข้อผิดพลาดในการอ่านไฟล์:', err);
        return;
    }

    // แปลงข้อมูล JSON เป็นออบเจ็กต์ JavaScript
    let users = JSON.parse(data);

    // เพิ่มข้อมูลผู้ใช้ใหม่
    let newUser = {
        id: users.length + 1,
        username: 'newusername',
        email: 'newemail@example.com',
        password: 'newpassword'
    };

    // เพิ่มข้อมูลใหม่ลงในอาร์เรย์ของผู้ใช้
    users.push(newUser);

    // แปลงกลับเป็น JSON
    let newData = JSON.stringify(users, null, 2);

    // เขียนข้อมูลใหม่ลงในไฟล์ user.json
    fs.writeFile('user.json', newData, 'utf8', (err) => {
        if (err) {
            console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', err);
            return;
        }
        console.log('บันทึกข้อมูลผู้ใช้ใหม่เรียบร้อยแล้ว');
    });
});
