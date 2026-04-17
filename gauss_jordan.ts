type Matrix = number[][];

const matrix1: Matrix = [
  [2, -6, 1, 3],
  [-1, 4, -3, 2],
  [-1, 2, -2, 1],
];

const matrix2: Matrix = [
  [1, 2, -3, -1],
  [3, -1, 2, 2],
  [5, 3, -4, 2],
];

const matrix3: Matrix = [
    [1, 1, -1, 0],
    [2, -3, 1, 0],
    [1, -4, 2, 0]
]

const gcd = (a: number, b: number): number => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    return b === 0 ? a : gcd(b, a % b);
};

const toFraction = (decimal: number): string => {
    if (Number.isInteger(decimal)) return String(decimal);
    
    const precision = 1000000; // para manejar flotantes
    const numerator = Math.round(decimal * precision);
    const denominator = precision;
    const divisor = gcd(Math.abs(numerator), denominator);
    
    return `${numerator / divisor}/${denominator / divisor}`;
};

const printMatrix = (matrix: Matrix) => {
  console.log(
    matrix
      .map((row) => row.map((n) => toFraction(n).padStart(4)).join(" "))
      .join("\n"),
  );
  console.log('\n')
};

const stepByStep = (input: Matrix) => {
    const matrix = input.map(row => [...row]);

    printMatrix(matrix);
    // Paso por paso:

    // Dividir toda la primera fila para obtener el primer pivote:
    if(matrix[0][0] != 1) {
        const pivot = matrix[0][0]
        for(let i = 0; i < matrix[0].length; i++) {
            matrix[0][i] = matrix[0][i]/pivot 
        }
    }

    // printMatrix(matrix);

    // F2 + xF1 = 0
    let x = -matrix[1][0]/matrix[0][0];
    matrix[1] = matrix[1].map((n, i) => {
        return n + (x*matrix[0][i])
    })

    // printMatrix(matrix)


    // F3 + xF1 = 0
    x = -matrix[2][0]/matrix[0][0];
    matrix[2] = matrix[2].map((n, i) => {
        return n + (x*matrix[0][i])
    })

    // printMatrix(matrix)

    // Aquí termina la primera columna

    // Empieza la segunda columna
    if(matrix[1][1] != 1) {
        const pivot = matrix[1][1]
        for(let i = 0; i < matrix[1].length; i++) {
            matrix[1][i] = matrix[1][i]/pivot 
        }
    }
    printMatrix(matrix)
}

const dynamic = (input: Matrix) => {
    const matrix = input.map(row => [...row]);

    console.log('Matriz inicial:')
    printMatrix(matrix);

    // Dinámico:
    for (let n = 0; n < matrix.length; n++) {

        // Pivoteo parcial: buscar el mayor valor absoluto en la columna
        let maxRow = n;
        for (let i = n + 1; i < matrix.length; i++) {
            if (Math.abs(matrix[i][n]) > Math.abs(matrix[maxRow][n])) {
                maxRow = i;
            }
        }

        // Intercambiar si encontramos una fila mejor
        if (maxRow !== n) {

            [matrix[n], matrix[maxRow]] = [matrix[maxRow], matrix[n]];
            console.log(`F${n + 1} <=> F${maxRow + 1}`)
            printMatrix(matrix);

        }

        // Si después del intercambio sigue siendo 0, no tiene solución única
        if (matrix[n][n] === 0) {
            console.log(`Columna ${n + 1} es todo ceros — x${n + 1} es variable libre`);
            printMatrix(matrix);
            continue;
        }


        // Sacar pivote
        const pivot = matrix[n][n]
        matrix[n] = matrix[n].map(val => val / pivot)
        console.log(`F${n + 1} = (1/${pivot}) * F${n + 1}`)
        printMatrix(matrix)

        for (let row = 0; row < matrix.length; row++) {
            if(n == row) continue;
            // F[fila actual] + x*F[columna actual]
            // -F[fila actual]/F[columna actual] = x
            const x = -matrix[row][n]
            console.log(`F${row + 1} = F${row + 1} + [(${toFraction(x)})*(F${n + 1})]`)
            matrix[row] = matrix[row].map((t, i) => {
                return t + (x*matrix[n][i])
            })
            printMatrix(matrix)
        }
    }

    console.log('Matriz resultante:')
    printMatrix(matrix)
}



//stepByStep()
dynamic(matrix3)