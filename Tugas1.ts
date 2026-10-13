// soal 1
let nim: string = "053922221";
let tinggi: number = Number(nim[nim.length -1]);
for (let i = 1; i <= tinggi; i++) {
    let baris: string = "";

    for (let j = 1; j <= i; j++) {
        baris += j + " ";
    }
    console.log(baris.trim());
}

// soal 2
let start: number = Number(nim.slice(-2));
let step: number = Number(nim[nim.length -3]) + 1;
let deret: number[] = [];
for (let i = 0; i < 10; i++) {
    deret.push(start + ( i * step));
}
console.log (deret.join(", "));

// soal 3
let duaDigitTerakhir: number = Number(nim.slice(-2));
let batas: number = duaDigitTerakhir + 10;
let bilanganPrima: number[] = [];
for (let angka = 2; angka <= batas; angka++) {
    let prima: boolean = true;
    for (let pembagi = 2; pembagi < angka; pembagi++) {
        if (angka % pembagi === 0) {
            prima = false;
            break
        }
    }
    if (prima) {
        bilanganPrima.push(angka);
    }
}
console.log(bilanganPrima.join(", "));
