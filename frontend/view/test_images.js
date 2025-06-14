document.getElementById('uploadButton').addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn không cho reload trang

    const fileInput = document.getElementById('hinhAnhFile');
    const file = fileInput.files[0];
    const status = document.getElementById('uploadStatus');
    const preview = document.getElementById('previewImage');

    if (!file) {
        status.innerText = 'Vui lòng chọn một file ảnh.';
        return;
    }

    const formData = new FormData();
    formData.append('image', file);
    alert("Vui lòng chọn ảnh11");
    fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
    })
    
        .then(response => {
            alert("Vui lòng chọn ảnh22");
            if (!response.ok) throw new Error('Upload không thành công');
            return response.json();
        })
        .then(data => {
            alert("Vui lòng chọn ảnh3");
            if (data.imageUrl) {
                status.innerText = 'Upload thành công!';
                preview.src = data.imageUrl;
                preview.style.display = 'block';
                console.log('Link ảnh:', data.imageUrl);
            } else {
                status.innerText = 'Upload thất bại!';
                console.error(data);
            }
        })
        .catch(error => {
            alert("Vui lòng chọn ảnh4");
            status.innerText = 'Đã xảy ra lỗi khi upload.';
            console.error('Lỗi:', error);
        });
});
