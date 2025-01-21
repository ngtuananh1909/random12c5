document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { name: "Há cảo", image: "img/hacao.png", percent: 12.5 },
        { name: "Khoai tây chiên", image: "https://texaschickenvn.com/vnt_upload/product/07_2023/Khoai_tay_chien_co_lon.png", percent: 12.5 },
        { name: "Xúc xích Đức", image: "img/xucxichduc.png", percent: 12.6 },
        { name: "Bánh su kem", image: "img/banhxukem.png", percent: 12.6 },
        { name: "Bánh flan", image: "img/banhflan.png", percent: 8.43 },
        { name: "Bim bim", image: "img/bimbim.png", percent: 16.8 },
        { name: "Nước ngọt", image: "img/nuocngot.png", percent: 16.9 },
        { name: "Vong tay", image: "https://laimut.com/wp-content/uploads/Vong-Tay-Swarovski-Chinh-Hang-Tennis-Deluxe-bracelet-01.jpg", percent: 2.08 },
        { name: "Babythree mini", image: "img/babythreemini.png", percent: 3.4 },
        { name: "Babythree big", image: "img/babythreegbig.png", percent: 0 },
    ];

    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin');
    const nextProductDisplay = document.getElementById('next-product-display');
    const nextProductText = document.getElementById('next-product-text');
    let currentRotation = 0;
    let isSpinning = false;
    let previousResult = -1;
    let nextResult = randomizeProduct();

    function randomizeProduct() {
        let randomIndex;
        do {
            const randomValue = Math.random() * 100;
            let cumulativePercent = 0;
    
            for (let i = 0; i < products.length; i++) {
                cumulativePercent += products[i].percent;
                if (randomValue <= cumulativePercent) {
                    randomIndex = i;
                    break;
                }
            }
        } while (randomIndex === previousResult || products[randomIndex].percent === 0);
        previousResult = randomIndex;
        return randomIndex;
    }    

    function displayNextProduct() {
        const nextProduct = products[nextResult];
        nextProductText.textContent = `Next: ${nextProduct.name}`;
    }

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;

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
            };

            const closeModal = document.getElementById('close-modal');
            closeModal.onclick = function () {
                modal.style.display = "none";
            };

            isSpinning = false;
            previousResult = currentIndex;
        }, 5000);
    }

    spinButton.addEventListener('click', spinWheel);

    document.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === 'g') { 
            if (!isSpinning) {
                nextResult = randomizeProduct();
                displayNextProduct();
            }
        } else if (event.key.toLowerCase() === 's') {
            nextProductDisplay.style.display = 'block'; // Hiển thị sản phẩm
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key.toLowerCase() === 's') {
            nextProductDisplay.style.display = 'none'; // Ẩn sản phẩm
        }
    });

    displayNextProduct();
});
