let continueSorting = true;
let selectedAlgorithm = 'bubble';

document.getElementById('array-size').addEventListener('input', updateDefaultArray);

window.addEventListener('load', () => {
    const defaultArraySize = 50;
    const minValue = 1;
    const maxValue = 100;
    const defaultArray = generateRandomArray(defaultArraySize, minValue, maxValue);
    visualizeArray(defaultArray);
    selectedAlgorithm = null;
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateBackground() {
    const body = document.body;
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

updateBackground();
setInterval(updateBackground, 5000);

function updateDefaultArray() {
    const arraySize = parseInt(document.getElementById('array-size').value);
    const minValue = 1;
    const maxValue = 100;
    const defaultArray = generateRandomArray(arraySize, minValue, maxValue);
    visualizeArray(defaultArray);
}

function visualizeArray(array, highlightIndex = -1) {
    const container = document.getElementById('bars-container');
    container.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        if (index === highlightIndex) {
            bar.classList.add('highlight');
        }
        bar.style.height = value * 3 + 'px';
        container.appendChild(bar);
    });
}

function generateRandomArray(size, min, max) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

async function bubbleSort(array, speed) {
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            visualizeArray(array, i);
            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
                visualizeArray(array, i + 1);
                await new Promise(resolve => setTimeout(resolve, speed));
                if (!continueSorting) return;
            }
        }
    } while (swapped && continueSorting);
}

async function selectionSort(array, speed) {
    const n = array.length;
    for (let i = 0; i < n - 1 && continueSorting; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            visualizeArray(array, j);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
            visualizeArray(array, minIndex);
            await new Promise(resolve => setTimeout(resolve, speed));
            if (!continueSorting) return;
        }
    }
}

async function insertionSort(array, speed) {
    const n = array.length;
    for (let i = 1; i < n && continueSorting; i++) {
        let key = array[i];
        let j = i - 1;
        visualizeArray(array, i);
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        visualizeArray(array, j + 1);
        await new Promise(resolve => setTimeout(resolve, speed));
        if (!continueSorting) return;
    }
}

async function mergeSort(array, speed) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const leftArray = array.slice(0, middle);
    const rightArray = array.slice(middle);

    return merge(
        await mergeSort(leftArray, speed),
        await mergeSort(rightArray, speed),
        speed
    );
}

async function merge(leftArray, rightArray, speed) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            resultArray.push(leftArray[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(rightArray[rightIndex]);
            rightIndex++;
        }
        visualizeMerge(leftArray, rightArray, resultArray, leftIndex, rightIndex);
        await new Promise(resolve => setTimeout(resolve, speed));
        if (!continueSorting) return;
    }

    return resultArray.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
}

async function visualizeMerge(leftArray, rightArray, resultArray, leftIndex, rightIndex) {
    const mergedArray = resultArray.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
    let highlightIndex = -1;
    if (leftIndex < leftArray.length) {
        highlightIndex = leftIndex;
    } else if (rightIndex < rightArray.length) {
        highlightIndex = leftArray.length + rightIndex;
    }
    visualizeArray(mergedArray, highlightIndex);
}


async function quickSort(array, speed, start = 0, end = array.length - 1) {
    if (start >= end) {
        return;
    }

    let index = await partition(array, speed, start, end);
    await quickSort(array, speed, start, index - 1);
    await quickSort(array, speed, index + 1, end);
}

async function partition(array, speed, start, end) {
    let pivotIndex = start;
    let pivotValue = array[end];
    visualizeArray(array, pivotIndex);

    for (let i = start; i < end; i++) {
        if (!continueSorting) return;

        visualizeArray(array, i);

        if (array[i] < pivotValue) {
            await swap(array, i, pivotIndex, speed);
            visualizeArray(array, pivotIndex);
            pivotIndex++;
        }
    }
    await swap(array, pivotIndex, end, speed);
    return pivotIndex;
}

async function swap(array, leftIndex, rightIndex, speed) {
    let temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
    visualizeArray(array, leftIndex);
    visualizeArray(array, rightIndex);
    await new Promise(resolve => setTimeout(resolve, speed));
}


function getSpeed() {
    const speedRange = document.getElementById('speed-range');
    return parseInt(speedRange.value) * 10;
}

async function startSorting(speed, array) {
    if (!selectedAlgorithm) {
        alert("Please select a sorting algorithm.");
        return;
    }
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = true;

    switch (selectedAlgorithm) {
        case 'bubble':
            await bubbleSort(array, speed);
            break;
        case 'selection':
            await selectionSort(array, speed);
            break;
        case 'insertion':
            await insertionSort(array, speed);
            break;
        case 'merge':
            await mergeSort(array, speed);
            break;
        case 'quick':
            await quickSort(array, speed);
            break;
    }
    document.getElementById('start-btn').disabled = false;
}

const arraySizeInput = document.getElementById('array-size');

arraySizeInput.addEventListener('input', () => {
    const maxValue = parseInt(arraySizeInput.getAttribute('max'));
    if (parseInt(arraySizeInput.value) > maxValue) {
        arraySizeInput.value = maxValue;
    }
});

document.querySelectorAll('.algorithm-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.algorithm-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedAlgorithm = button.getAttribute('data-algorithm');
    });
});

document.getElementById('reset-btn').addEventListener('click', () => {
    window.location.reload();
});

document.getElementById('start-btn').addEventListener('click', async () => {
    const arraySize = parseInt(document.getElementById('array-size').value);
    if (arraySize > 100 && selectedAlgorithm === 'selection') {
        alert("Selection sort is disabled for array sizes greater than 100.");
        return;
    }

    const speed = getSpeed();
    const minValue = 1;
    const maxValue = 100;
    const array = generateRandomArray(arraySize, minValue, maxValue);
    visualizeArray(array);
    await startSorting(speed, array);
});

