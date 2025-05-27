// script.js
// Fungsi untuk menampilkan jenis persamaan yang dipilih
function showEquationType(type) {
    document.getElementById('linear-equations').style.display = 
        type === 'linear' ? 'block' : 'none'; // Toggle tampilan persamaan linear
    document.getElementById('non-linear-equations').style.display = 
        type === 'non-linear' ? 'block' : 'none'; // Toggle tampilan non-linear
    document.getElementById('result').innerHTML = ''; // Kosongkan hasil sebelumnya
}

// Fungsi penyelesaian persamaan linear
function solveLinear() {
    // Ambil nilai input dan konversi ke float
    const a1 = parseFloat(document.getElementById('l1x').value) || 0;
    const b1 = parseFloat(document.getElementById('l1y').value) || 0;
    const c1 = parseFloat(document.getElementById('l1c').value) || 0;
    // ... (variabel a2, b2, c2 diambil dengan cara sama)
    
    // Format tampilan solusi
    let resultHTML = `<h3>Solusi Persamaan Linear (｡·  v  ·｡) ?</h3>`;
    
    // Proses eliminasi Gaussian
    let matrix = [[a1, b1, c1], [a2, b2, c2]]; // Bentuk matrix augmented
    // ... (logika eliminasi dan substitusi)
    
    document.getElementById('result').innerHTML = resultHTML; // Tampilkan hasil
}

// Fungsi penyelesaian persamaan non-linear
function solveNonLinear() {
    // Ambil nilai input persamaan kuadrat
    const a = parseFloat(document.getElementById('nl1x2').value) || 0;
    // ... (variabel lainnya diambil dengan cara sama)
    
    // Metode substitusi
    try {
        // Ekspresikan y dari persamaan linear
        // Substitusi ke persamaan kuadrat
        // Hitung diskriminan dan akar-akar
        // ... (logika penyelesaian kuadrat)
    } catch(e) {
        // Handle error
    }
}

// Fungsi utilitas untuk format tampilan koefisien
function formatCoeff(coeff) {
    if (coeff === 1) return ""; // Sembunyikan koefisien 1
    if (coeff === -1) return "-"; // Tampilkan tanda minus saja
    return coeff.toString();
}
