let ImgIn = document.getElementById('getFileIn');
let ImgInLabe = document.getElementById('actFileIn');
let ImgApplyBtn = document.getElementById('applyImg');

let ClearStorage = document.getElementById('clrStorage');

let base64Data = '';

function readImg(event) {
    const file = event.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (file && validTypes.includes(file.type)) {
        const imgData = new FileReader();
        
        imgData.onload = (e) => {
            base64Data = e.target.result;
            ImgInLabe.style.color = 'green';
            return base64Data;
        }

        imgData.readAsDataURL(file)
    } else {
        ImgInLabe.style.color = 'red';
    }
}

// Read Img
ImgIn.addEventListener('change', readImg);
// Add local storage
ImgApplyBtn.addEventListener('click', () => {
    console.log(base64Data);
    if (base64Data) {
        base64Data = JSON.stringify(base64Data);
        sessionStorage.setItem('imageBase64', base64Data);
        window.location.reload();
    } else {
        window.alert("Incorect File Format!");
    }
});

// Clear local storage
ClearStorage.addEventListener('click', () => {
    sessionStorage.removeItem('imageBase64');
    window.location.reload();
});