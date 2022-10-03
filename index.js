const fs = require('fs');

const fileName = process.argv[2];

// Méthode asynchrone
// fs.readFile(fileName, 'utf8', (error, data) => {
//     if (error) {
//         console.error(error.message);
//         return ;
//     }
//     console.log(data);
// });

// Méthode synchrone
var list
try {
    const data = fs.readFileSync(fileName, 'utf8');
    list = data.split(' ').map(element => parseFloat(element));
} catch (error) {
    console.error(error.message);
}

console.log(bubble_sort([...list]));
console.log(insertion_sort([...list]));
console.log(selection_sort([...list]));
console.log(quick_sort([...list]));

function bubble_sort(ary){
    var comparison = 0;
    for(var i = 0; i < ary.length; i++){
        for(var j = 0 ; j < ary.length - i - 1 ; j++){
            if(ary[j]>ary[j+1]){
                [ary[j], ary[j+1]] = [ary[j+1], ary[j]];
            }
            comparison +=1;
        }
    }
    return `Bubble sort: ${comparison} comparisons ` + ary;
}

function insertion_sort(ary){
    var comparison = 0;
    for(var i = 1; i < ary.length; i++){
        for(var j = i ; j > 0 ; j--){
            if(ary[j] < ary[j -1]){
                // Here we copy ary[j] and insert it at index j - 1
                ary.splice(j - 1, 0, ary[j]);
                // Now we delete the element we just copied which is now in position j + 1 instead of j
                ary.splice(j + 1, 1);
            }
            comparison += 1;
        }
    }
    return `Insertion sort: ${comparison} comparisons ` + ary;
}

function selection_sort(ary){
    var comparison = 0;
    for(var i = 0; i < ary.length; i++){
        var min = ary[i];
        for(var j = i + 1; j < ary.length; j++){
            if(ary[j] < min){
                min = ary[j];
            }
            comparison += 1;
        }
        ary.splice(i, 0, min);
        // Here we look for the value min to destroy it but we have to be careful not to delete the first value we just copied.
        // Hence the i + 1 stating that we are only looking for the value after index i + 1
        ary.splice(ary.indexOf(min, i + 1), 1)
    }
    return `Selection sort: ${comparison} comparisons ` + ary;
}

function quick_sort(ary){
    var result = qs(ary);
    return `Quick sort: x comparisons ` + result;
}

function qs(ary){
    if(ary.length <=1){
        return ary;
    }else{
        pivot = ary.pop();
    }
    let greater_than_pivot = [];
    let smaller_than_pivot = [];
    ary.map(function(element){
        if(element < pivot){
            smaller_than_pivot.push(element);
        }else{
            greater_than_pivot.push(element);
        }
    })
    return qs(smaller_than_pivot).concat([pivot],qs(greater_than_pivot));
}