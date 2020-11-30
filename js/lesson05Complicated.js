const arr = ['3267672', '745634', '12315', '773423', '23135', '4546535', '23256'];

for (let i = 0; i < arr.length; i++) {

    if (arr[i][0] == 2 || arr[i][0] == 4) {
        console.log(arr[i].split());
    }
}

function primality(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return n > 1;
}

for (let n = 2; n < 100; n++) {
    
    if (primality(n)) {
        document.write(n + ' ');
    }
}
