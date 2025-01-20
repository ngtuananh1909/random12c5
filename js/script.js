document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { name: "Há cảo", image: "img/hacao.png", percent: 12.5 },
        { name: "Khoai tây chiên", image: "https://texaschickenvn.com/vnt_upload/product/07_2023/Khoai_tay_chien_co_lon.png", percent: 12.5 },
        { name: "Xúc xích Đức", image: "img/xucxichduc.png", percent: 12.5 },
        { name: "Bánh su kem", image: "img/banhxukem.png", percent: 12.5 },
        { name: "Bánh flam", image: "img/banhflan.png", percent: 8.33 },
        { name: "Bim bim", image: "img/bimbim.png", percent: 16.67 },
        { name: "Nước ngọt", image: "img/nuocngot.png", percent: 16.67 },
        { name: "Rau câu dừa", image: "img/raucaudua.png", percent: 4.17 },
        { name: "Babythree mini", image: "img/babythreemini.png", percent: 3.75 },
        { name: "Babythree big", image: "img/babythreegbig.png", percent: 0.42 },
    ];

    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin');
    let currentRotation = 0;

    function randomizeProduct() {
        const randomValue = Math.random() * 100;
        let cumulativePercent = 0;

        for (let i = 0; i < products.length; i++) {
            cumulativePercent += products[i].percent;
            if (randomValue <= cumulativePercent) {
                return i;
            }
        }
        return 0;
    }

    let nextResult = randomizeProduct();

    function displayNextProduct() {
        const nextProduct = products[nextResult];
        console.log(`${nextProduct.name}`);
    }

    function spinWheel() {
        const currentIndex = nextResult;
        const currentProduct = products[currentIndex];

        nextResult = randomizeProduct();
        displayNextProduct();

        const targetRotation = (360 / products.length) * currentIndex;
        const fullRotation = 360 * 10;
        const rotationDelta = targetRotation - (currentRotation % 360);
        const totalRotation = fullRotation + rotationDelta;

        currentRotation += totalRotation;

        wheel.style.transition = "transform 5s ease-out";
        wheel.style.transform = `rotate(-${currentRotation}deg)`;

        setTimeout(() => {
            const modal = document.getElementById('result-modal');
            const productImage = document.getElementById('product-image');
            const productName = document.getElementById('product-name');

            productImage.src = currentProduct.image;
            productName.textContent = currentProduct.name;

            modal.style.display = "flex";

            const okBtn = document.getElementById('ok-btn');
            okBtn.onclick = function () {
                modal.style.display = "none";
            }

            const closeModal = document.getElementById('close-modal');
            closeModal.onclick = function () {
                modal.style.display = "none";
            }
        }, 5000);
    }

    spinButton.addEventListener('click', spinWheel);

    // Lắng nghe phím bấm
    document.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === 'g') { // Kiểm tra nếu phím bấm là "G" (không phân biệt hoa/thường)
            nextResult = randomizeProduct();
            displayNextProduct(); // Hiển thị sản phẩm tiếp theo trong console
        }
    });

    displayNextProduct();
});
