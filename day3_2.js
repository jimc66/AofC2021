const fs = require('fs')
var file_name = 'day3.txt';
var life_array_string = fs.readFileSync (file_name).toString().split("\n");


num_items = life_array_string.length;
line_len = life_array_string[0].length; //assume all lines are the same length as line 0 !!!!

// function to figure out most common item in an array position 
// takes as input: an array that assumes consistent length
// which index item in the array to compare (from 0 to item length)
// returns an array with either 0 or 1 (as a string), and the number of times item found
// assumes the array is all strings of 0s or 1s
function most_common (input_array, index_item) {
    items_in_array = input_array.length;
    count_zero = 0;
    count_one = 0;
    for (var j = 0; j <items_in_array; j++) {
        if (input_array[j][index_item] =='0')
            count_zero = count_zero + 1;
        else
            count_one = count_one + 1;    
    }
    if ( count_one >= count_zero) {
        return ['1',count_one];
    }
    else {
        return ['0',count_zero];
    }

}

// function to figure out LEAST common item in an array position 
// takes as input: an array that assumes consistent length
// which index item in the array to compare (from 0 to item length)
// returns an array with either 0 or 1 (as a string), and the number of times item found
// assumes the array is all strings of 0s or 1s
function least_common (input_array, index_item) {
    items_in_array = input_array.length;
    count_zero = 0;
    count_one = 0;
    for (var j = 0; j <items_in_array; j++) {
        if (input_array[j][index_item] =='0')
            count_zero = count_zero + 1;
        else
            count_one = count_one + 1;    
    }
    if ( count_zero <= count_one) {
        return ['0',count_zero];
    }
    else {
        return ['1',count_one];
    }

}


// function to only keep the array lines where the value at the bit position 
// matches the input value (assumed zero or one as a string)
// takes as input: 
//  an array that assumes consistent length
//  which index item in the array to compare (from 0 to item length)
//  which values to keep (0 or 1)
// returns array
// assumes the array is all strings of 0s or 1s
function keep_values (input_array, index_item, item_value) {
    items_in_array = input_array.length;
//    count_zero = 0;
//    count_one = 0;
    return_array = [];
    for (var j = 0; j <items_in_array; j++) {
        if (input_array[j][index_item] == item_value){
            return_array.push (input_array[j]);
        }  
    }
    return (return_array);


}

// need to loop through most common down to one item
// for oxygen rating
lines_to_consider = num_items;
working_array = life_array_string;
final_o2_array =[];
current_line_pos = 0;
while (lines_to_consider > 0) {
    common_current_pos = most_common(working_array,current_line_pos); //returns array
    lines_to_consider = common_current_pos[1];
    working_array = keep_values(working_array,current_line_pos,common_current_pos[0]); //array, position, value
    if (working_array.length > 1){ //num of common items  > 0
        current_line_pos = current_line_pos + 1;
        //        working_array = keep_values(working_array,common_current_pos[1],common_current_pos[0]); //array, position, value
    }
    else {
        final_o2_array = working_array; 
        lines_to_consider=0; // break out
    }
//    lines_to_consider = common_zero_spot[1]
}
oxygen_binary = final_o2_array.join('');
oxygen_rating = parseInt(oxygen_binary,2);

// need to loop through most common down to one item
// for CO2 rating
lines_to_consider = num_items;
working_array = life_array_string;
final_Co2_array =[];
current_line_pos = 0;
while (lines_to_consider > 0) {
    common_current_pos = least_common(working_array,current_line_pos); //returns array
    lines_to_consider = common_current_pos[1];
    working_array = keep_values(working_array,current_line_pos,common_current_pos[0]); //array, position, value
    if (working_array.length > 1){ //num of common items  > 0
        current_line_pos = current_line_pos + 1;
        //        working_array = keep_values(working_array,common_current_pos[1],common_current_pos[0]); //array, position, value
    }
    else {
        final_Co2_array = working_array; 
        lines_to_consider = 0; 
    }
//    lines_to_consider = common_zero_spot[1]
}
Co2_binary = final_Co2_array.join('');
Co2_rating = parseInt(Co2_binary,2);

// final output
console.log (' oxygen %i' , oxygen_rating);
console.log (' CO2 scrubber %i' , Co2_rating);
product = oxygen_rating * Co2_rating;
console.log ('\n product %i' , product);
