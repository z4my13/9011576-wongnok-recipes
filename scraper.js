const fs = require('fs');

// อ่านไฟล์ HTML
fs.readFile('login.html', 'utf8', (err, html) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    
    // เรียกใช้ฟังก์ชัน scrapeAndSaveData และส่ง html เข้าไป
    scrapeAndSaveData(html);
});
