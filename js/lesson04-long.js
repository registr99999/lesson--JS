function checkNaN (a) {
    let res = prompt(a);

    if (isNaN(res) || res ==='' || res === null) {
        if (res.length < 30) {
            console.log(res.trim());
            console.log(res.length);
        }else {
            console.log(res.trim().substring(0, 30) + '...');
            console.log(typeof res);
            console.log(res.length);
        }
        
    }
    return res;
}

let text = checkNaN('введите название любимого фильма');




