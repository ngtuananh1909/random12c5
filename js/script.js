const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spin');
let currentRotation = 0; // Góc hiện tại ban đầu bằng 0

// Danh sách sản phẩm
const products = [
    "Há cảo",
    "Kim bắp",
    "Xúc xích Đức",
    "Bánh su kem",
    "Bánh flam",
    "Bim bim",
    "Nước ngọt",
    "Rau câu dừa",
    "Babythree"
];

let nextResult = randomizeProduct(); // Kết quả vòng tiếp theo

// Hàm random sản phẩm
function randomizeProduct() {
    return Math.floor(Math.random() * products.length);
}

// Hàm để quay vòng
function spinWheel() {
    const currentIndex = nextResult; // Lấy kết quả vòng hiện tại
    const currentProduct = products[currentIndex];

    // Tính góc mới
    const targetRotation = (360 / products.length) * currentIndex;

    // Tính tổng góc quay theo công thức: 360 * số vòng + (góc mới - góc hiện tại)
    const fullRotation = 360 * 2; // Số vòng quay
    const rotationDelta = targetRotation - (currentRotation % 360);
    const totalRotation = fullRotation + rotationDelta;

    // Cập nhật góc hiện tại
    currentRotation += totalRotation;

    // Random cho vòng quay tiếp theo
    nextResult = randomizeProduct(); // Lưu kết quả vòng tiếp theo
    const nextProduct = products[nextResult];

    // Áp dụng rotation
    wheel.style.transition = "transform 5s ease-out";
    wheel.style.transform = `rotate(-${currentRotation}deg)`; // Quay ngược chiều kim đồng hồ

    // Ghi log kết quả
    console.log(`Kết quả vòng này: ${currentProduct}`);
    console.log(`Kết quả vòng tiếp theo: ${nextProduct}`);

    // Hiển thị kết quả sau khi dừng
    setTimeout(() => {
        alert(`Bạn đã trúng: ${currentProduct}`);
    }, 5000);
}

// Thêm sự kiện khi nhấn nút quay
spinButton.addEventListener('click', spinWheel);
