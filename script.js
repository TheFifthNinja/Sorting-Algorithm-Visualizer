let continueSorting = true;
let selectedAlgorithm = 'bubble'; // Default algorithm

// Event listener for the input field for array size
document.getElementById('array-size').addEventListener('input', updateDefaultArray);

// Function to generate a default random array of numbers when the page loads
window.addEventListener('load', () => {
    const defaultArraySize = 50; // Default size of the array
    const minValue = 1;
    const maxValue = 100;
    const defaultArray = generateRandomArray(defaultArraySize, minValue, maxValue);
    visualizeArray(defaultArray);
    selectedAlgorithm = null;
});

// Function to generate a random color in hexadecimal format
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to update the background with random colors
function updateBackground() {
    const body = document.body;
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

// Call the updateBackground function initially and then every few seconds
updateBackground();
setInterval(updateBackground, 5000); // Update every 10 seconds

// Function to generate a default random array of numbers based on the current array size value
function updateDefaultArray() {
    const arraySize = parseInt(document.getElementById('array-size').value);
    const minValue = 1;
    const maxValue = 100;
    const defaultArray = generateRandomArray(arraySize, minValue, maxValue);
    visualizeArray(defaultArray);
}

// Function to visualize the array as bars
function visualizeArray(array, highlightIndex = -1) {
    const container = document.getElementById('bars-container');
    container.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        if (index === highlightIndex) {
            bar.classList.add('highlight');
        }
        bar.style.height = value * 3 + 'px'; // Adjust height multiplier as needed
        container.appendChild(bar);
    });
}

// Function to generate an array of random numbers
function generateRandomArray(size, min, max) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

// Bubble Sort algorithm
async function bubbleSort(array, speed) {
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            visualizeArray(array, i); // Highlight the current bar
            if (array[i] > array[i + 1]) {
                // Swap array[i] and array[i+1]
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
                // Visualize the swap
                visualizeArray(array, i + 1);
                await new Promise(resolve => setTimeout(resolve, speed)); // Delay for visualization
                if (!continueSorting) return; // Check if sorting should continue
            }
        }
    } while (swapped && continueSorting);
}

// Selection Sort algorithm
async function selectionSort(array, speed) {
    const n = array.length;
    for (let i = 0; i < n - 1 && continueSorting; i++) { // Check continueSorting in loop condition
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            visualizeArray(array, j); // Highlight the current bar
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            // Swap array[i] and array[minIndex]
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
            // Visualize the swap
            visualizeArray(array, minIndex);
            await new Promise(resolve => setTimeout(resolve, speed)); // Delay for visualization
            if (!continueSorting) return; // Check if sorting should continue
        }
    }
}

// Insertion Sort algorithm
async function insertionSort(array, speed) {
    const n = array.length;
    for (let i = 1; i < n && continueSorting; i++) { // Check continueSorting in loop condition
        let key = array[i];
        let j = i - 1;
        visualizeArray(array, i); // Highlight the current bar
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        // Visualize the swap
        visualizeArray(array, j + 1);
        await new Promise(resolve => setTimeout(resolve, speed)); // Delay for visualization
        if (!continueSorting) return; // Check if sorting should continue
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
        await new Promise(resolve => setTimeout(resolve, speed)); // Delay for visualization
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
    visualizeArray(array, pivotIndex); // Highlight the pivot element

    for (let i = start; i < end; i++) {
        if (!continueSorting) return;

        visualizeArray(array, i); // Highlight the current bar

        if (array[i] < pivotValue) {
            await swap(array, i, pivotIndex, speed);
            visualizeArray(array, pivotIndex); // Highlight the pivot after swapping
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
    visualizeArray(array, leftIndex); // Highlight the leftIndex element after swapping
    visualizeArray(array, rightIndex); // Highlight the rightIndex element after swapping
    await new Promise(resolve => setTimeout(resolve, speed)); // Delay for visualization
}


// Function to get the selected speed from the range input
function getSpeed() {
    const speedRange = document.getElementById('speed-range');
    return parseInt(speedRange.value) * 10; // Convert the value to an integer
}

// Function to start the sorting process
async function startSorting(speed, array) {
    if (!selectedAlgorithm) {
        alert("Please select a sorting algorithm.");
        return;
    }
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = true; // Disable the button

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
        // Add cases for other sorting algorithms if needed
    }
    document.getElementById('start-btn').disabled = false; // Re-enable the button after sorting
}

const arraySizeInput = document.getElementById('array-size');

// Add event listener to restrict input value
arraySizeInput.addEventListener('input', () => {
    const maxValue = parseInt(arraySizeInput.getAttribute('max'));
    if (parseInt(arraySizeInput.value) > maxValue) {
        arraySizeInput.value = maxValue;
    }
});

// Event listener for the algorithm buttons
document.querySelectorAll('.algorithm-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.algorithm-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedAlgorithm = button.getAttribute('data-algorithm');
    });
});

// Event listener for the "Reset" button
document.getElementById('reset-btn').addEventListener('click', () => {
    window.location.reload(); // Reload the page
});

// Event listener for the "Start Sorting" button
document.getElementById('start-btn').addEventListener('click', async () => {
    const arraySize = parseInt(document.getElementById('array-size').value);
    if (arraySize > 100 && selectedAlgorithm === 'selection') {
        alert("Selection sort is disabled for array sizes greater than 100.");
        return;
    }

    const speed = getSpeed(); // Get the speed from the range input
    const minValue = 1;
    const maxValue = 100;
    const array = generateRandomArray(arraySize, minValue, maxValue);
    visualizeArray(array); // Display the initial array
    await startSorting(speed, array); // Pass the speed and array to the startSorting function
});


