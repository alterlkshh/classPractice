function finddiff(arr1, arr2){

    let updated=0,added=0,removed=0;

    for(let i = 0; i<arr2.length; i++){
        let found = false;
        for(let j=0;j<arr1.length;j++){
            if(arr1[j] === arr2[i]){
                found = true;
            }
        }
        if(found){
            updated += 1;
        } else {
            added += 1;
        }
    }

    for(let i = 0; i<arr1.length; i++){
        let found = false;
        for(let j=0;j<arr2.length;j++){
            if(arr1[i] === arr2[j]){
                found = true;
            }
        }
        if(!found){
            removed++;
        }
    }

    return {
        updatedvalue : updated,
        addedvalue : added,
        removedvalues : removed
    }
}

let diff = finddiff([1,2,3], [1,2,3,4,5]);
console.log(diff);