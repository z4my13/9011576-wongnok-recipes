document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

    // รับค่าอีเมลและรหัสผ่านจากฟอร์ม
    var email = this.email.value;
    var password = this.pswd.value;

    // โหลดข้อมูลผู้ใช้จาก user.json
    fetch('user.json')
    .then(response => response.json())
    .then(data => {
        // ตรวจสอบว่ามีข้อมูลผู้ใช้ที่ตรงกับที่ผู้ใช้ป้อนหรือไม่
        var user = data.find(user => user.email === email && user.password === password);
        if (user) {
            alert('เข้าสู่ระบบสำเร็จ');
            // ในที่นี้คุณสามารถเปลี่ยนหน้าหลังจากเข้าสู่ระบบสำเร็จได้
        } else {
            alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }
    })
    .catch(error => console.error('เกิดข้อผิดพลาด:', error));
});
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

    // รับค่าจากฟอร์ม
    var username = this.txt.value;
    var email = this.email.value;
    var password = this.pswd.value;

    // โหลดข้อมูลผู้ใช้จาก user.json
    fetch('user.json')
    .then(response => response.json())
    .then(data => {
        // ตรวจสอบว่ามีอีเมลซ้ำหรือไม่
        var existingUser = data.find(user => user.email === email);
        if (existingUser) {
            alert('อีเมลนี้มีอยู่แล้วในระบบ');
        } else {
            // สร้างข้อมูลผู้ใช้ใหม่
            var newUser = {
                id: data.length + 1,
                username: username,
                email: email,
                password: password
            };
            // เพิ่มข้อมูลผู้ใช้ใหม่ลงใน JSON
            data.push(newUser);
            // บันทึกข้อมูลใหม่ลงในไฟล์ JSON
            saveData(data);
            alert('สมัครสมาชิกสำเร็จ');
        }
    })
    .catch(error => console.error('เกิดข้อผิดพลาด:', error));
});

// ฟังก์ชันบันทึกข้อมูลใหม่ลงในไฟล์ JSON
function saveData(data) {
    fetch('user.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}