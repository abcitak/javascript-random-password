const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
passwordInput = document.querySelector(".input-box input"),
copyIcon = document.querySelector(".input-box span"),
passLengthChar = document.querySelector(".pass-length span"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase : "abcdefghjklmnoprstuvwxyz",
    uppercase : "ABCDEFGHJKLMNOPRSTUVWXYZ",
    numbers : "0123456789",
    symbols : "+*/[](){};.^':%#"
};

const generatePass = () => {
    let staticPassword = "",
        randomPassword = "",
        excDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += " ";
            } else {
                excDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if (excDuplicate) {
            if (randomPassword.includes(randomChar) || randomChar === " ") {
                i--; // tekrar eden veya boşluksa yeniden dene
            }
        }
        randomPassword += randomChar; // normalde ekle
    }

    passwordInput.value = randomPassword; // oluşturulan şifreyi inputa ata
}

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check"; // kopyalandı simgesi
    setTimeout(() => {
        copyIcon.innerText = "copy_all"
    }, 1500);
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
};


const updateRange = () => {
    passLengthChar.innerHTML = lengthSlider.value;
    generatePass();
    updatePassIndicator();
}

updateRange();

lengthSlider.addEventListener("input",updateRange);
generateBtn.addEventListener("click",generatePass);
copyIcon.addEventListener("click",copyPassword);