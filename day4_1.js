const fs = require('fs')
var file_name = 'day4.txt';

//
//   find_match
// 
// function to find all the matches for a specific number in
// a "2 dimensional array" 
// takes as input: 
//   a 2 dimensional array
//   the number to match 
//   the array to update matches (updates all matches to 1)
//       (array should be pre-populated with zeros - no match)

// which index item in the array to compare (from 0 to item length)
// returns an array with either 0 or 1 (as a string), and the number of times item found
// assumes the array is all strings of 0s or 1s
function find_match (input_array, match_num, match_storage ) {
    items_in_array = input_array.length;
    for (var j = 0; j <items_in_array; j++) {
        items_in_sub_array = input_array[j];
        sub_array_len =items_in_sub_array.length;
        for (var h =0; h < sub_array_len; h++){
            if (input_array[j][h] == match_num) {
                // we found a match
                line_update = match_storage[j].slice();
                line_update[h] = 1;
                match_storage[j] = line_update.slice();
            }
        }
  

    }
    return;
}


//
//   check_bingo
// 
//function to see if we have a bingo
// checks "2 dimensional array" 
// takes as input: 
//   the array of matches 
//   the array with the numbers
//   the "length" of a card
// returns a 2 dimensional array 
// [0, values]
// where first item is either 
//    0 [no winner]
//    1 [winner]
// second value is the array of numbers for that "line"
//     array of numbers (or 5 zeros)
// third value is the array "line" that the match was found on 
// assumes the array is all strings of 0s or 1s
function check_bingo (match_storage, value_array, card_len) {
    items_in_array = match_storage.length;
    local_no_matches = [0,0,0,0,0];
    for (var j = 0; j <items_in_array; j++) { //doing horizontal matches first
        sum_items = 0;
        items_in_sub_array = match_storage[j];
        sub_array_len =items_in_sub_array.length;
        for (var h =0; h < sub_array_len; h++){
            sum_items = sum_items + items_in_sub_array[h];
            }
        if (sum_items ==5){
            return_array = value_array[j];
            return [1, return_array, j]; //match, the numbers, the array line of the match
            }
        }
    //  still need to check for matches "down"
    //  *******************
   
    last_line=0;
    for (var j = 0; j < 5 ; j++) { //doing vertical matches (hard coded items per line) 
        if ((j % 5) == 0){ //reset sum every "column" (also works for first)
            sum_items = 0;
            return_array = [];
            match_values = [];
        }
        for (var h = 0; h < items_in_array; h++) { // start walking down the array
            if ((h % card_len) == 0) { //we just traversed cards, set to zero (works for first card too)
                if (sum_items == 5) {
//                    return_array = return_array; //nope
                    return [1, return_array, last_line]; //match, the numbers, the array line of the match
                }
                sum_items = 0;
                return_array = [];
                match_values = [];
            }
            // need to get the 5 items 
            single_match = match_storage[h][j]; // get the 1s and 0s
            sum_items = sum_items + single_match;
            match_values.push(single_match);

            single_value = value_array[h][j];
            return_array.push(single_value);
            last_line = h;
            }
        } 

    return [0,local_no_matches];
    }

//
//   count_unmatched
//  
//function to find all the UNMATCHED numbers for a specific card
// a "2 dimensional array" 
// takes as input: 
//   array of card matches
//   array of tracked matches
//   the "line" (index of the array) for the matched card
//   the "length" of a bingo card (i.e.   5 lines)
//
//
// returns an integer which is the SUM of all unmatched numbers on a particular card
// assumes the match array is all strings of 0s or 1s
function count_unmatched (card_values, match_storage, match_line, card_len ) {
    items_in_array = match_storage.length;
    // figure out which 5 lines to read
    // 
    sum_non_matches = 0;
    starting_line_offset = match_line % card_len;
    starting_line = match_line - starting_line_offset ;
    for (var j = starting_line; j < starting_line + card_len; j++) {
        items_in_sub_array = card_values[j];
        match_status_sub_array = match_storage[j];
        sub_array_len =items_in_sub_array.length;
        for (var h =0; h < sub_array_len; h++){
            if (match_status_sub_array[h] == 0) {
                // we found a no match item
                sum_non_matches = sum_non_matches + items_in_sub_array[h];
            }
        }
  

    }
    return (sum_non_matches);
}

var bingo_card_len = 5;
var bingo_array_string = fs.readFileSync (file_name).toString().split("\n");

// get the numbers being called for bingo
var bingo_str = bingo_array_string[0].replace(/\s+/g, ' ').trim();
var bingo_nums = bingo_str.split(',').map(Number);

// throw away first 2 lines / elements now that they are in nums
bingo_array_string.shift(); // get rid of the number entries
bingo_array_string.shift(); // and the first blank line

//now get the cards (yeah this is probable a little brute force)
bingo_cards_concat = bingo_array_string.join('\n');
bingo_cards_array = bingo_cards_concat.split('\n\n');

// turn array of strings into array of numbers
// we'll jam all the cards together (every 5th item is a new card)
bingo_cards_array_byline = [];
match_tracker = [];
no_matches = [0,0,0,0,0]; //a line in a card with no matches
for (i in bingo_cards_array){
    sub_items = bingo_cards_array[i].split('\n');
    for (j in sub_items) {
        // remove leading and double spaces as this messes it up
        working_subitem = sub_items[j].replace(/\s+/g, ' ').trim();
        individual_numbers = working_subitem.split(' ').map(Number);
        bingo_cards_array_byline.push(individual_numbers);
        match_tracker.push(no_matches); // add a tracker with no matches each time
        }
       
    }

console.log (bingo_cards_array_byline);
// done to here - have a set of numbers, have a set of cards as numbers
for (num in bingo_nums) {
    find_match(bingo_cards_array_byline, bingo_nums[num], match_tracker); // add current number to card matches
    any_bingo = check_bingo (match_tracker,bingo_cards_array_byline, bingo_card_len);
    if (any_bingo[0] == 1){
        console.log ('match');
        sum_unmatched = count_unmatched (bingo_cards_array_byline,match_tracker,any_bingo[2],bingo_card_len);

//        sum_nums = any_bingo[1].reduce((a,b) => a + b, 0); // misunderstood the question
        product = sum_unmatched * bingo_nums[num];
        console.log (product);
        break; // i don't know if this is "bad", but we found a match so let's bail
        }
} /// done to here - finding matches for across, not down


// final output
console.log ('\n product %i' , product);
