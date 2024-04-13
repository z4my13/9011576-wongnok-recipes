const fs = require('fs');

// เรียกใช้งานไลบรารี Cheerio
const cheerio = require('cheerio');

// ฟังก์ชันสำหรับดึงข้อมูลจาก HTML และบันทึกลงในฐานข้อมูล
function scrapeAndSaveData(html) {
    // ใช้ Cheerio เพื่อโหลด HTML
    const $ = cheerio.load(html);

    // ดึงข้อมูลจากฟอร์มล็อกอิน
    const email = $('input[name="email"]').val();
    const password = $('input[name="pswd"]').val();

    // แสดงข้อมูลใน console เพื่อตรวจสอบ
    console.log('Email:', email);
    console.log('Password:', password);

    // เรียกใช้ฟังก์ชันบันทึกข้อมูลลงในฐานข้อมูล
    saveDataToDatabase(email, password);
}

// ฟังก์ชันสำหรับบันทึกข้อมูลลงในฐานข้อมูล
function saveDataToDatabase(email, password) {
    // เชื่อมต่อกับฐานข้อมูลและทำการบันทึกข้อมูล
    // โค้ดเชื่อมต่อกับฐานข้อมูล SQL Server และบันทึกข้อมูลลงในฐานข้อมูล
    // โค้ดนี้ควรจะใส่ไว้ในส่วนที่เหมาะสมกับการใช้งานจริง ๆ
    console.log('Data saved successfully');
}

// อ่านไฟล์ HTML และเรียกใช้งานฟังก์ชัน scrapeAndSaveData
fs.readFile('login.html', 'utf8', (err, html) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    
    scrapeAndSaveData(html);
});
