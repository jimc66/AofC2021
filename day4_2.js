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
        sub_array_match_items = match_storage [j];
        for (var h =0; h < sub_array_len; h++){
            if (input_array[j][h] == match_num) {
                // we found a match
                line_update = match_storage[j].slice();
 //               line_update = sub_array_match_items.slice();
                line_update[h] = 1;
                match_storage[j] = line_update.slice();
            }
        }
  

    }
    return;
}


//
//   check_bingo2
// **
// now need to see how many matches we have
// **
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
// third value is the array "line" that the match was found on  ?? more than 1 match
//  next value is which cards had matches array of cards, 0=nomatch 1=match
// last value is all matched 1=true 0=false
// assumes the array is all strings of 0s or 1s
function check_bingo2 (match_storage, value_array, card_len) {
    items_in_array = match_storage.length;
    local_no_matches = [0,0,0,0,0];
    total_matches = 0;
    card_num_length = bingo_cards_array_byline.length;
    total_cards = card_num_length / bingo_card_len; //a little sloppy assumes array len is good
    card_matches = []; // home many cards have a match
    for (var i = 0; i < total_cards; i ++) {
        card_matches.push(0); // no card matches
        }
    for (var j = 0; j <items_in_array; j++) { //doing horizontal matches first
        sum_items = 0;
        items_in_sub_array = match_storage[j];
        sub_array_len =items_in_sub_array.length;
        for (var h =0; h < sub_array_len; h++){
            sum_items = sum_items + items_in_sub_array[h];
            }
        if (sum_items ==5){
            return_array = value_array[j];
            // don't return the first match!
            total_matches = total_matches + 1;
            current_card = Math.floor(j / card_len);
            card_matches[current_card] = 1;
            // ==> pulled: return [1, return_array, j]; //match, the numbers, the array line of the match
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
                if (sum_items == 5) {  // i think we have an off by 1 error!
//                    return_array = return_array; //nope
                    total_matches = total_matches + 1;
                    current_card = Math.floor(last_line / card_len);
                    card_matches[current_card] = 1;
                    // nope ==> return [1, return_array, last_line]; //match, the numbers, the array line of the match
                }  // something must be wrong in here 
                //
                //
                //=========  TRY DEBUGGING WITH THE single_value ==13 
                //
                sum_items = 0;
                return_array = [];
                match_values = [];
            }
            // need to get the 5 items 
            single_value = value_array[h][j];
            single_match = match_storage[h][j]; // get the 1s and 0s
            sum_items = sum_items + single_match;
            match_values.push(single_value);

            single_value = value_array[h][j];
            return_array.push(single_value);
            last_line = h;
            }
        } 
    all_cards_matched = 1; // set all matched to true;
    for (var i = 0; i < total_cards; i++ ) {
        if (card_matches[i] == 0){
            all_cards_matched = 0;
            break;
        }
    }
    if (total_matches == 0){
        return [0,local_no_matches, 0, total_matches,card_matches,all_cards_matched];
    }
    else {
        return [1,return_array, last_line, total_matches,card_matches,all_cards_matched];
    }
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

// console.log (bingo_cards_array_byline);
// done to here - have a set of numbers, have a set of cards as numbers
bingo_keeper_line = 0; // save the winning one
last_number = 0; 
match_keeper = [];
total_bingos = 0; //how many "bingos"
// need to track how many actual cards have bingos
// start by setting matches to no (zero)
card_num_length = bingo_cards_array_byline.length;
total_cards = card_num_length / bingo_card_len;
card_matches2 = []; // home many cards have a match
for (var i = 0; i < total_cards; i ++) {
    card_matches2.push(0);
}
for (num in bingo_nums) {
    last_number = bingo_nums[num];
    if (last_number == 13) {
        console.log ('why not done now');
    }
    find_match(bingo_cards_array_byline, bingo_nums[num], match_tracker); // add current number to card matches
    any_bingo = check_bingo2 (match_tracker,bingo_cards_array_byline, bingo_card_len);
    if (any_bingo[5] == 1) { // just got all cards to match
            // do your work here before the values get messed up
        //    figure out what the new card is
        card_to_use=-1;
        for (var card_iter = 0; card_iter < total_cards; card_iter++) {
            if (card_matches2[card_iter] != any_bingo[4][card_iter]) {
                card_to_use = card_iter;
                actual_card_line = card_to_use * 5;
                //sum2_unmatched = count_unmatched (bingo_cards_array_byline,match_keeper,actual_card_line,bingo_card_len);
                sum2_unmatched = count_unmatched (bingo_cards_array_byline,match_tracker,actual_card_line,bingo_card_len);
                console.log ('final sum  %i', sum2_unmatched);
                product2 = sum2_unmatched * last_number;
                console.log ('product %i', product2);

            }
        
        }    
        // then figure out why we've got the wrong number!!! bingo_num[num]
    }
    // may not need any of this 
    if (any_bingo[0] == 1){
        if (any_bingo[3] > total_bingos) {
            // we found a NEW match
            //match winning cards
            //  =====================================================
            card_with_the_win = 0; // ====>>> WE ARE HERE
            for (var l = 0; l < total_cards; l ++){ // track the winning cards
                single_value = any_bingo[4][l];
                card_matches2[l] = single_value;
            }

            total_bingos = any_bingo[3];
            bingo_keeper_line = any_bingo[2]; //save the winner, but by reference won't work
            match_keeper = [];
            match_len = match_tracker.length;
            for (var k =0; k < match_len; k++ ){
                match_single_line = match_tracker[k];
                match_keeper.push(Array.from(match_single_line));
            }
        }
    }
} 
sum_unmatched = count_unmatched (bingo_cards_array_byline,match_keeper,bingo_keeper_line,bingo_card_len);
product = sum_unmatched * last_number;
//        console.log (product);

// final output
console.log ('\n final product %i' , product);
