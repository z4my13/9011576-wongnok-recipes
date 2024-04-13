const fs = require('fs');
const cheerio = require('cheerio');
const tedious = require('tedious');

// ฟังก์ชันสำหรับดึงข้อมูลจาก HTML และบันทึกลงในฐานข้อมูล
function scrapeAndSaveData(html) {
    // ใช้ Cheerio เพื่อโหลด HTML
    const $ = cheerio.load(html);

    // ดึงข้อมูลจากฟอร์มล็อกอิน
    const email = $('input[name="email"]').val();
    const password = $('input[name="pswd"]').val();

    // เชื่อมต่อกับฐานข้อมูลและทำการบันทึกข้อมูล
    saveDataToDatabase(email, password);
}

// ฟังก์ชันสำหรับบันทึกข้อมูลลงในฐานข้อมูล
function saveDataToDatabase(email, password) {
    const config = {
        server: 'INTCH',
        options: {
            database: 'db_recipe',
            trustedConnection: true // ใช้ Windows Authentication
        }
    };

    // สร้างการเชื่อมต่อฐานข้อมูล
    const connection = new tedious.Connection(config);

    connection.on('connect', (err) => {
        if (err) {
            console.error('Error connecting to SQL Server:', err);
            return;
        }

        console.log('Connected to SQL Server');

        // สร้างคำสั่ง SQL เพื่อบันทึกข้อมูล
        const request = new tedious.Request(`INSERT INTO Logins (Email, Password) VALUES ('${email}', '${password}')`, (err) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return;
            }

            console.log('Data saved successfully');
        });

        // ส่งคำสั่ง SQL ไปยังฐานข้อมูล
        connection.execSql(request);
    });
}

// อ่านไฟล์ HTML และเรียกใช้งานฟังก์ชัน scrapeAndSaveData
fs.readFile('login.html', 'utf8', (err, html) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    
    scrapeAndSaveData(html);
});
