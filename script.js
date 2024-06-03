let continueSorting = true;

// Function to generate a default random array of numbers when the page loads
window.addEventListener('load', () => {
    const defaultArraySize = 50; // Default size of the array
    const minValue = 1;
    const maxValue = 100;
    const defaultArray = generateRandomArray(defaultArraySize, minValue, maxValue);
    visualizeArray(defaultArray);
});

// Function to generate a default random array of numbers based on the current array size value
function updateDefaultArray() {
    const arraySize = parseInt(document.getElementById('array-size').value);
    const minValue = 1;
    const maxValue = 100;
    const defaultArray = generateRandomArray(arraySize, minValue, maxValue);
    visualizeArray(defaultArray);
}

// Event listener for the input field for array size
document.getElementById('array-size').addEventListener('input', updateDefaultArray);

// Function to generate an array of random numbers
function generateRandomArray(size, min, max) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

// Function to visualize the array as bars
function visualizeArray(array) {
    const container = document.getElementById('bars-container');
    container.innerHTML = '';
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
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

// Function to generate an array of random numbers
function generateRandomArray(size, min, max) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

// Function to visualize the array as bars
function visualizeArray(array) {
    const container = document.getElementById('bars-container');
    container.innerHTML = '';
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = value * 3 + 'px'; // Adjust height multiplier as needed
        container.appendChild(bar);
    });
}

// Bubble Sort algorithm
async function bubbleSort(array, speed) {
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // Swap array[i] and array[i+1]
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
                // Visualize the swap
                visualizeArray(array);
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
            visualizeArray(array);
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
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        // Visualize the swap
        visualizeArray(array);
        await new Promise(resolve => setTimeout(resolve, speed)); // Delay for visualization
        if (!continueSorting) return; // Check if sorting should continue
    }
}


// Function to get the selected speed from the range input
function getSpeed() {
    const speedRange = document.getElementById('speed-range');
    return parseInt(speedRange.value); // Convert the value to an integer
}

// Function to start the sorting process
async function startSorting(speed, array) {
    const algorithm = document.getElementById('algorithm-select').value;
    switch (algorithm) {
        case 'bubble':
            await bubbleSort(array, speed);
            break;
        case 'selection':
            await selectionSort(array, speed);
            break;
        case 'insertion':
            await insertionSort(array, speed);
            break;
        // Add cases for other sorting algorithms if needed
    }
}


// Event listener for the "Reset" button
document.getElementById('reset-btn').addEventListener('click', () => {
    window.location.reload(); // Reload the page
});


// Event listener for the "Start Sorting" button
// Event listener for the "Start Sorting" button
document.getElementById('start-btn').addEventListener('click', async () => {

    
    // After resetting, start sorting automatically
    const speed = getSpeed(); // Get the speed from the range input
    const arraySize = parseInt(document.getElementById('array-size').value);
    const minValue = 1;
    const maxValue = 100;
    const array = generateRandomArray(arraySize, minValue, maxValue);
    visualizeArray(array); // Display the initial array
    await startSorting(speed, array); // Pass the speed and array to the startSorting function
});
