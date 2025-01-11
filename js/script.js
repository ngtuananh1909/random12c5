const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spin');
let currentRotation = 0; // Góc hiện tại ban đầu bằng 0

// Danh sách sản phẩm và tỷ lệ (tổng tỷ lệ phải bằng 100%)
const products = [
    { name: "Há cảo", image: "img/hacao.png", percent: 10 },
    { name: "Kim bắp", image: "img/kimbap.png", percent: 15 },
    { name: "Xúc xích Đức", image: "img/xucxichduc.png", percent: 5 },
    { name: "Bánh su kem", image: "img/banhxukem.png", percent: 20 },
    { name: "Bánh flam", image: "img/banhflan.png", percent: 10 },
    { name: "Bim bim", image: "img/bimbim.png", percent: 10 },
    { name: "Nước ngọt", image: "img/nuocngot.png", percent: 10 },
    { name: "Rau câu dừa", image: "img/raucaudua.png", percent: 10 },
    { name: "Babythree mini", image: "img/babythreemini.png", percent: 5 },
    { name: "Babythree big", image: "img/babythreegbig.png", percent: 5 },
];

// Hàm random sản phẩm theo tỷ lệ
function randomizeProduct() {
    const randomValue = Math.random() * 100; // Giá trị ngẫu nhiên từ 0 đến 100
    let cumulativePercent = 0;

    for (let i = 0; i < products.length; i++) {
        cumulativePercent += products[i].percent;
        if (randomValue <= cumulativePercent) {
            return i; // Trả về chỉ mục của sản phẩm được chọn
        }
    }
    return 0; // Dự phòng nếu không trùng
}

// Hàm để quay vòng
function spinWheel() {
    const currentIndex = randomizeProduct(); // Lấy kết quả vòng hiện tại
    const currentProduct = products[currentIndex];

    // Tính góc mới
    const targetRotation = (360 / products.length) * currentIndex;

    // Tính tổng góc quay theo công thức: 360 * số vòng + (góc mới - góc hiện tại)
    const fullRotation = 360 * 2; // Số vòng quay
    const rotationDelta = targetRotation - (currentRotation % 360);
    const totalRotation = fullRotation + rotationDelta;

    // Cập nhật góc hiện tại
    currentRotation += totalRotation;

    // Áp dụng rotation
    wheel.style.transition = "transform 5s ease-out";
    wheel.style.transform = `rotate(-${currentRotation}deg)`; // Quay ngược chiều kim đồng hồ

    // Ghi log kết quả
    console.log(`Kết quả vòng này: ${currentProduct.name}`);

    // Hiển thị kết quả sau khi dừng
    setTimeout(() => {
        // Hiển thị modal kết quả
        const modal = document.getElementById('result-modal');
        const productImage = document.getElementById('product-image');
        const productName = document.getElementById('product-name');

        // Cập nhật nội dung modal
        productImage.src = currentProduct.image;
        productName.textContent = currentProduct.name;

        // Hiển thị modal
        modal.style.display = "flex";

        // Đóng modal khi nhấn vào nút OK
        const okBtn = document.getElementById('ok-btn');
        okBtn.onclick = function() {
            modal.style.display = "none";
        }

        // Đóng modal khi nhấn vào nút đóng
        const closeModal = document.getElementById('close-modal');
        closeModal.onclick = function() {
            modal.style.display = "none";
        }
    }, 5000); // Chờ 5 giây sau khi quay xong
}

// Thêm sự kiện khi nhấn nút quay
spinButton.addEventListener('click', spinWheel);
