const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spin');
let currentRotation = 0; // Góc hiện tại ban đầu bằng 0

// Danh sách sản phẩm và hình ảnh tương ứng
const products = [
    { name: "Há cảo", image: "img/hacao.png" },
    { name: "Kim bắp", image: "img/kimbap.png" },
    { name: "Xúc xích Đức", image: "img/xucxichduc.png" },
    { name: "Bánh su kem", image: "img/banhxukem.png" },
    { name: "Bánh flam", image: "img/banhflan.png" },
    { name: "Bim bim", image: "img/bimbim.png" },
    { name: "Nước ngọt", image: "img/nuocngot.png" },
    { name: "Rau câu dừa", image: "img/raucaudua.png" },
    { name: "Babythree mini", image: "img/babythreemini.png" },
    { name: "Babythree big", image: "img/babythreegbig.png" }
];

let nextResult = randomizeProduct(); // Kết quả vòng quay tiếp theo

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

    setTimeout(() => {
        // Hiển thị modal
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
