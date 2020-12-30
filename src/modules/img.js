const img = () => {
    const img = document.querySelectorAll('.command__photo');
    img.forEach((item) => {
        let src = item.getAttribute('src', 'value');
        let data = item.dataset.img;

        item.addEventListener('mouseenter', () => {
            item.setAttribute('src', data);
        })
        item.addEventListener('mouseleave', () => {
            item.setAttribute('src', src);
        })
    });

}

export default img;
