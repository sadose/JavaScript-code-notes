// 1 交换排序 - 冒泡排序

// 时间复杂度 : 最好 O(n) 最坏/平均 O(n²)
// 空间复杂度 : O(1)
// 稳定排序

function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; ++i) {
        for (let j = 0; j < i; ++j) {
            if (arr[j] > arr[j + 1]) {
                const t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }
    return arr;
}


// 2 交换排序 - 快速排序

// 时间复杂度 : 最好/平均 O(nlogn) 最坏 O(n²)
// 空间复杂度 : O(nlogn)
// 不稳定排序

function quickSort(arr, start, end) {
    if (start === undefined) {
        start = 0;
        end = arr.length - 1
    }
    let i = start,
        j = end,
        a = arr[i];
    if (i >= j) return arr;
    while (i < j) {
        while (arr[j] >= a && i < j) --j;
        arr[i] = arr[j];
        while (arr[i] <= a && i < j) ++i;
        arr[j] = arr[i];
    }
    arr[i] = a;
    quickSort(arr, start, i - 1);
    quickSort(arr, i + 1, end);
    return arr;
}


// 3 插入排序 - 简单插入排序

// 时间复杂度 : 最好 O(n) 最坏/平均 O(n²)
// 空间复杂度 : O(1)
// 稳定排序

function insertSort(arr) {
    ;
}


// 4 插入排序 - 希尔排序

// 时间复杂度 : 最好 O(n) 最坏 O(n²) 平均 O(n^1.3)
// 空间复杂度 : O(1)
// 不稳定排序

function shellSort(arr) {
    ;
}


// 5 选择排序 - 简单选择排序

// 时间复杂度 : 最好/最坏/平均 O(n²)
// 空间复杂度 : O(1)
// 不稳定

function selectSort(arr) {
    ;
}


// 6 选择排序 - 堆排序

// 时间复杂度 : 最好/最坏/平均 O(nlogn)
// 空间复杂度 : O(1)
// 不稳定排序

function heapSort(arr) {
    ;
}


// 7 归并排序

// 时间复杂度 : 最好/最坏/平均 O(nlogn)
// 空间复杂度 : O(n)
// 稳定排序

function mergeSort(arr) {
    ;
}


// 8 基数排序

// 时间复杂度 : 最好/最坏/平均 O(n*k)
// 空间复杂度 : O(n+k)
// 稳定排序

function radixSort(arr) {
    ;
}


// 9 计数排序

// 时间复杂度 : 最好/最坏/平均 O(n+k)
// 空间复杂度 : O(n+k)
// 稳定排序

function countingSort(arr) {
    ;
}


// 10 桶排序

// 时间复杂度 : 最好 O(n) 最坏 O(n²) 平均 O(n+k)
// 空间复杂度 : O(n+k)
// 稳定排序

function bucketSort(arr) {
    ;
}


// 11 测试

// 洗牌算法打乱数组