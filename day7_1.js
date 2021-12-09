const fs = require('fs')
var file_name = 'day7.txt';

//
//   calc_fuel
//  
//function to calc the fuel used to get the crabs to a specific position
// 
// takes as input: 
//   array of crabs (their spot)
//   where you want them to end up
//
//
// returns an integer which is the SUM of all the "fuel" used to get them there
function calc_fuel (crab_array, rally_point ) {
    items_in_array = crab_array.length;
    // figure out which 5 lines to read
    // 
    sum_fuel = 0;
    for (var j = 0; j < items_in_array; j++) {
        math_space_to_move = crab_array[j] - rally_point;
        space_to_move = Math.abs(math_space_to_move);
        sum_fuel = sum_fuel + space_to_move;
            
        }
  
    return (sum_fuel);
}


// crab_move_cost
//
// input - spaces to move (int)
// return value - the cost (int)
//
function crab_move_cost (spaces) {
    total_cost = 0;
    incremental_cost = 1;
    for (var i =0; i < spaces; i++){
        total_cost = total_cost + incremental_cost;
        incremental_cost = incremental_cost + 1;
    }
return (total_cost);
}

//
//   calc_fuel2
//
//  For the day 2 calculation  
//
//function to calc the fuel used to get the crabs to a specific position
// 
// takes as input: 
//   array of crabs (their spot)
//   where you want them to end up
//
//
// returns an integer which is the SUM of all the "fuel" used to get them there
function calc_fuel2 (crab_array, rally_point ) {
    items_in_array = crab_array.length;
    // figure out which 5 lines to read
    // 
    sum_fuel = 0;
    for (var j = 0; j < items_in_array; j++) {
        math_space_to_move = crab_array[j] - rally_point;
        space_to_move = Math.abs(math_space_to_move);
        one_crab_cost = crab_move_cost (space_to_move);
        sum_fuel = sum_fuel + one_crab_cost;
            
        }
  
    return (sum_fuel);
}

var crab_array_string = fs.readFileSync (file_name).toString().split("\n");

// get the numbers being called for bingo
//var crab_pos_str = crab_array_string[0].replace(/\s+/g, ' ').trim();
crab_pos_str = crab_array_string[0];

crab_nums = crab_pos_str.split(',').map(Number);


// find the highest and lowest numbers
high_crab = Math.max(...crab_nums);
low_crab = Math.min(...crab_nums);

// set the fuel to -1 for each position to start 
// and.... looked at the data so cheating / knowing that zero is an OK starting point for the array 
// that is, no negative numbers in the data set
var total_fuel_by_pos = Array(high_crab).fill(-1);
number_of_crabs = crab_nums.length;

console.log ('Day 1 challenge answers: \n');
lowest_fuel = -1;
magic_pos = -1;
for (var i = 0; i < high_crab; i++){ // is this "off by one" on the high end? check it
    fuel_used = calc_fuel (crab_nums, i);
    if (lowest_fuel == -1) { // first one gets set to start
        lowest_fuel = fuel_used;
        magic_pos = i;
    }
    else { // it's not the first one
        if (fuel_used < lowest_fuel) {
            lowest_fuel = fuel_used;
            magic_pos = i;
        }
    }
}
console.log ('low fuel  %i', lowest_fuel);
console.log ('crab spot %i', magic_pos);
// 
// Now - let's do day 2
// repeat code block (sorry) except for function call

console.log ('\n============\nDay 2 challenge answers: \n');
lowest_fuel = -1;
magic_pos = -1;
for (var i = 0; i < high_crab; i++){ // is this "off by one" on the high end? check it 
    fuel_used = calc_fuel2 (crab_nums, i); // not crab_nums[i], just i !!!
    if (lowest_fuel == -1) { // first one gets set to start
        lowest_fuel = fuel_used;
        magic_pos = i;
    }
    else { // it's not the first one
        if (fuel_used < lowest_fuel) {
            lowest_fuel = fuel_used;
            magic_pos = i;
        }
    }
}
console.log ('low fuel  %i', lowest_fuel);
console.log ('crab spot %i', magic_pos);
