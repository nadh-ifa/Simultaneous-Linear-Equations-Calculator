function showEquationType(type) {
    document.getElementById('linear-equations').style.display = 
        type === 'linear' ? 'block' : 'none';
    document.getElementById('non-linear-equations').style.display = 
        type === 'non-linear' ? 'block' : 'none';
    document.getElementById('result').innerHTML = '';
}

function solveLinear() {
    const a1 = parseFloat(document.getElementById('l1x').value) || 0;
    const b1 = parseFloat(document.getElementById('l1y').value) || 0;
    const c1 = parseFloat(document.getElementById('l1c').value) || 0;
    const a2 = parseFloat(document.getElementById('l2x').value) || 0;
    const b2 = parseFloat(document.getElementById('l2y').value) || 0;
    const c2 = parseFloat(document.getElementById('l2c').value) || 0;

    let resultHTML = `<h3>Solusi Persamaan Linear (｡·  v  ·｡) ?</h3>`;
    
    // Format persamaan
    resultHTML += `<div class="steps">`;
    resultHTML += `<p><strong>📝 Persamaan yang akan diselesaikan:</strong></p>`;
    resultHTML += `<p>Persamaan 1: ${formatCoeff(a1)}x ${formatTerm(b1, 'y')} = ${c1}</p>`;
    resultHTML += `<p>Persamaan 2: ${formatCoeff(a2)}x ${formatTerm(b2, 'y')} = ${c2}</p>`;
    resultHTML += `</div>`;

    // Cek kasus khusus
    if (a1 === 0 && b1 === 0 && a2 === 0 && b2 === 0) {
        resultHTML += `<p>❌ Masukkan minimal satu koefisien yang tidak nol</p>`;
        document.getElementById('result').innerHTML = resultHTML;
        return;
    }

    // Metode eliminasi Gaussian
    resultHTML += `<div class="steps">`;
    resultHTML += `<p><strong>🔧 Metode Eliminasi Gaussian:</strong></p>`;

    // Matrix augmented
    let matrix = [
        [a1, b1, c1],
        [a2, b2, c2]
    ];

    resultHTML += `<p>Matrix augmented awal:</p>`;
    resultHTML += `<p>[${matrix[0].join(', ')}]</p>`;
    resultHTML += `<p>[${matrix[1].join(', ')}]</p>`;

    // Forward elimination
    let pivot1 = matrix[0][0];
    let pivot2 = matrix[1][0];

    if (Math.abs(pivot1) < 1e-10 && Math.abs(pivot2) < 1e-10) {
        // Kedua koefisien x adalah 0, cek koefisien y
        if (Math.abs(matrix[0][1]) < 1e-10 && Math.abs(matrix[1][1]) < 1e-10) {
            resultHTML += `<p>❌ Sistem tidak memiliki variabel</p>`;
        } else {
            // Solve untuk y saja
            let y1 = matrix[0][1] !== 0 ? matrix[0][2] / matrix[0][1] : null;
            let y2 = matrix[1][1] !== 0 ? matrix[1][2] / matrix[1][1] : null;
            
            if (y1 !== null && y2 !== null) {
                if (Math.abs(y1 - y2) < 1e-10) {
                    resultHTML += `<p>♾️ Sistem memiliki infinite solutions dengan y = ${y1.toFixed(6)}</p>`;
                } else {
                    resultHTML += `<p>❌ Sistem tidak konsisten</p>`;
                }
            } else if (y1 !== null) {
                resultHTML += `<p>✨ y = ${y1.toFixed(6)}, x dapat berupa nilai apapun</p>`;
            } else if (y2 !== null) {
                resultHTML += `<p>✨ y = ${y2.toFixed(6)}, x dapat berupa nilai apapun</p>`;
            }
        }
    } else {
        // Standard Gaussian elimination
        if (Math.abs(pivot1) < 1e-10) {
            // Swap rows
            [matrix[0], matrix[1]] = [matrix[1], matrix[0]];
            resultHTML += `<p>Tukar baris 1 dan 2</p>`;
            pivot1 = matrix[0][0];
            pivot2 = matrix[1][0];
        }

        if (Math.abs(pivot1) > 1e-10) {
            // Eliminate x from second equation
            if (Math.abs(pivot2) > 1e-10) {
                let factor = pivot2 / pivot1;
                matrix[1][0] = matrix[1][0] - factor * matrix[0][0];
                matrix[1][1] = matrix[1][1] - factor * matrix[0][1];
                matrix[1][2] = matrix[1][2] - factor * matrix[0][2];
                
                resultHTML += `<p>R2 = R2 - (${factor.toFixed(4)})×R1</p>`;
                resultHTML += `<p>Matrix setelah eliminasi:</p>`;
                resultHTML += `<p>[${matrix[0].map(x => x.toFixed(4)).join(', ')}]</p>`;
                resultHTML += `<p>[${matrix[1].map(x => x.toFixed(4)).join(', ')}]</p>`;
            }

            // Back substitution
            if (Math.abs(matrix[1][1]) < 1e-10) {
                if (Math.abs(matrix[1][2]) < 1e-10) {
                    resultHTML += `<p>♾️ Sistem memiliki infinite solutions</p>`;
                } else {
                    resultHTML += `<p>❌ Sistem tidak konsisten (0 = ${matrix[1][2].toFixed(6)})</p>`;
                }
            } else {
                let y = matrix[1][2] / matrix[1][1];
                let x = (matrix[0][2] - matrix[0][1] * y) / matrix[0][0];
                
                resultHTML += `<p><strong>🎯 Back Substitution:</strong></p>`;
                resultHTML += `<p>Dari baris 2: y = ${matrix[1][2].toFixed(4)} / ${matrix[1][1].toFixed(4)} = ${y.toFixed(6)}</p>`;
                resultHTML += `<p>Dari baris 1: x = (${matrix[0][2].toFixed(4)} - ${matrix[0][1].toFixed(4)} × ${y.toFixed(6)}) / ${matrix[0][0].toFixed(4)} = ${x.toFixed(6)}</p>`;
                
                resultHTML += `<p><strong>✨ Solusi Final:</strong></p>`;
                resultHTML += `<p>x = ${x.toFixed(6)}</p>`;
                resultHTML += `<p>y = ${y.toFixed(6)}</p>`;
                
                // Verification
                let check1 = a1 * x + b1 * y;
                let check2 = a2 * x + b2 * y;
                resultHTML += `<p><strong>🔍 Verifikasi:</strong></p>`;
                resultHTML += `<p>Persamaan 1: ${check1.toFixed(6)} ≈ ${c1} ✓</p>`;
                resultHTML += `<p>Persamaan 2: ${check2.toFixed(6)} ≈ ${c2} ✓</p>`;
            }
        } else {
            resultHTML += `<p>❌ Tidak dapat menyelesaikan sistem</p>`;
        }
    }

    resultHTML += `</div>`;
    document.getElementById('result').innerHTML = resultHTML;
}

function solveNonLinear() {
    const a = parseFloat(document.getElementById('nl1x2').value) || 0;
    const b = parseFloat(document.getElementById('nl1x').value) || 0;
    const c = parseFloat(document.getElementById('nl1y').value) || 0;
    const d = parseFloat(document.getElementById('nl1c').value) || 0;
    
    const m = parseFloat(document.getElementById('nl2x').value) || 0;
    const n = parseFloat(document.getElementById('nl2y').value) || 0;
    const p = parseFloat(document.getElementById('nl2c').value) || 0;

    let resultHTML = `<h3>Solusi Persamaan Non-Linear ( ╹ -╹)?</h3>`;
    
    resultHTML += `<div class="steps">`;
    resultHTML += `<p><strong>📝 Sistem persamaan:</strong></p>`;
    resultHTML += `<p>Persamaan 1 (kuadrat): ${formatCoeff(a)}x² ${formatTerm(b, 'x')} ${formatTerm(c, 'y')} = ${d}</p>`;
    resultHTML += `<p>Persamaan 2 (linear): ${formatCoeff(m)}x ${formatTerm(n, 'y')} = ${p}</p>`;
    resultHTML += `</div>`;

    if (n === 0) {
        resultHTML += `<p>❌ Koefisien y pada persamaan linear tidak boleh nol</p>`;
        document.getElementById('result').innerHTML = resultHTML;
        return;
    }

    try {
        resultHTML += `<div class="steps">`;
        resultHTML += `<p><strong>🔧 Metode Substitusi:</strong></p>`;
        
        // Step 1: Express y from linear equation
        resultHTML += `<p><strong>Langkah 1:</strong> Nyatakan y dari persamaan linear</p>`;
        resultHTML += `<p>${n}y = ${p} - ${m}x</p>`;
        resultHTML += `<p>y = (${p} - ${m}x) / ${n}</p>`;

        // Step 2: Substitute into quadratic equation
        resultHTML += `<p><strong>Langkah 2:</strong> Substitusi ke persamaan kuadrat</p>`;
        resultHTML += `<p>${a}x² + ${b}x + ${c}((${p} - ${m}x)/${n}) = ${d}</p>`;

        // Step 3: Expand and simplify
        resultHTML += `<p><strong>Langkah 3:</strong> Ekspansi dan penyederhanaan</p>`;
        let A = a;
        let B = b - (c * m) / n;
        let C = (c * p) / n - d;

        resultHTML += `<p>${A}x² + ${B.toFixed(6)}x + ${C.toFixed(6)} = 0</p>`;

        // Step 4: Solve quadratic equation
        resultHTML += `<p><strong>Langkah 4:</strong> Selesaikan persamaan kuadrat</p>`;
        
        if (Math.abs(A) < 1e-10) {
            // Linear equation
            if (Math.abs(B) < 1e-10) {
                if (Math.abs(C) < 1e-10) {
                    resultHTML += `<p>♾️ Infinite solutions</p>`;
                } else {
                    resultHTML += `<p>❌ No solution</p>`;
                }
            } else {
                let x = -C / B;
                let y = (p - m * x) / n;
                resultHTML += `<p>Persamaan linear: x = ${x.toFixed(6)}</p>`;
                resultHTML += `<p>Maka y = ${y.toFixed(6)}</p>`;
                resultHTML += `<p><strong>✨ Solusi:</strong> (${x.toFixed(6)}, ${y.toFixed(6)})</p>`;
            }
        } else {
            // Quadratic equation
            let discriminant = B * B - 4 * A * C;
            resultHTML += `<p>Diskriminan = ${B.toFixed(6)}² - 4(${A})(${C.toFixed(6)}) = ${discriminant.toFixed(6)}</p>`;

            if (discriminant < 0) {
                resultHTML += `<p>❌ Tidak ada solusi real (diskriminan negatif)</p>`;
            } else if (Math.abs(discriminant) < 1e-10) {
                // One solution
                let x = -B / (2 * A);
                let y = (p - m * x) / n;
                resultHTML += `<p><strong>✨ Satu solusi (akar kembar):</strong></p>`;
                resultHTML += `<p>x = ${x.toFixed(6)}</p>`;
                resultHTML += `<p>y = ${y.toFixed(6)}</p>`;
                
                // Verification
                let check1 = a * x * x + b * x + c * y;
                let check2 = m * x + n * y;
                resultHTML += `<p><strong>🔍 Verifikasi:</strong></p>`;
                resultHTML += `<p>Persamaan 1: ${check1.toFixed(6)} ≈ ${d} ✓</p>`;
                resultHTML += `<p>Persamaan 2: ${check2.toFixed(6)} ≈ ${p} ✓</p>`;
            } else {
                // Two solutions
                let sqrtD = Math.sqrt(discriminant);
                let x1 = (-B + sqrtD) / (2 * A);
                let x2 = (-B - sqrtD) / (2 * A);
                let y1 = (p - m * x1) / n;
                let y2 = (p - m * x2) / n;

                resultHTML += `<p><strong>✨ Dua solusi:</strong></p>`;
                resultHTML += `<p>Solusi 1: x₁ = ${x1.toFixed(6)}, y₁ = ${y1.toFixed(6)}</p>`;
                resultHTML += `<p>Solusi 2: x₂ = ${x2.toFixed(6)}, y₂ = ${y2.toFixed(6)}</p>`;
                
                // Verification
                let check1_1 = a * x1 * x1 + b * x1 + c * y1;
                let check1_2 = m * x1 + n * y1;
                let check2_1 = a * x2 * x2 + b * x2 + c * y2;
                let check2_2 = m * x2 + n * y2;
                
                resultHTML += `<p><strong>🔍 Verifikasi Solusi 1:</strong></p>`;
                resultHTML += `<p>Persamaan 1: ${check1_1.toFixed(6)} ≈ ${d} ✓</p>`;
                resultHTML += `<p>Persamaan 2: ${check1_2.toFixed(6)} ≈ ${p} ✓</p>`;
                resultHTML += `<p><strong>🔍 Verifikasi Solusi 2:</strong></p>`;
                resultHTML += `<p>Persamaan 1: ${check2_1.toFixed(6)} ≈ ${d} ✓</p>`;
                resultHTML += `<p>Persamaan 2: ${check2_2.toFixed(6)} ≈ ${p} ✓</p>`;
            }
        }
        
        resultHTML += `</div>`;
    } catch(e) {
        resultHTML += `<p>😿 Error dalam perhitungan: ${e.message}</p>`;
    }
    
    document.getElementById('result').innerHTML = resultHTML;
}

function formatCoeff(coeff) {
    if (coeff === 0) return "0";
    if (coeff === 1) return "";
    if (coeff === -1) return "-";
    return coeff.toString();
}

function formatTerm(coeff, variable) {
    if (coeff === 0) return "";
    let sign = coeff > 0 ? "+ " : "- ";
    let absCoeff = Math.abs(coeff);
    if (absCoeff === 1) {
        return sign + variable;
    }
    return sign + absCoeff + variable;
}