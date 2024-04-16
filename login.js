// Firebase Authentication
const auth = firebase.auth();

// Firebase Realtime Database
const database = firebase.database();

// สร้างฟังก์ชั่นสำหรับการลงทะเบียนผู้ใช้
function signUpUser(email, password, username) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // บันทึกข้อมูลผู้ใช้ลงใน Firebase Realtime Database
            const userId = userCredential.user.uid;
            database.ref('users/' + userId).set({
                username: username,
                email: email
            });
            console.log("User signed up successfully:", userCredential.user);
        })
        .catch((error) => {
            console.error("Error signing up:", error);
        });
}

// สร้างฟังก์ชั่นสำหรับการเข้าสู่ระบบ
function signInUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User signed in successfully:", userCredential.user);
        })
        .catch((error) => {
            console.error("Error signing in:", error);
        });
}

// เรียกใช้งานฟังก์ชั่นเมื่อมีการส่งแบบฟอร์ม
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = signUpForm.querySelector('input[name="txt"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="pswd"]').value;
    signUpUser(email, password, userName);
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="pswd"]').value;
    signInUser(email, password);
});
