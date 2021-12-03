const fs = require('fs')
var file_name = 'day3.txt';
var power_array_string = fs.readFileSync (file_name).toString().split("\n");

var direction_array = [];
var direction_num = [];
var increase = 0;

num_items = power_array_string.length;
line_len = power_array_string[0].length; //assume all lines are the same length as line 0 !!!!

// create and initialize counters for positions zero through line length
zero_array = [];
one_array = [];
for (var i=0; i < line_len;i++){
    zero_array.push (0);
    one_array.push(0);
}

gamma_rate = [];
epsilon_rate = [];

for (var i = 0; i < num_items; i++){ // go down all the lines
    // read each position at each line, increment 2 arrays for zeros and ones
    for (var j = 0; j <line_len; j++) {
        if (power_array_string[i][j] =='0')
            zero_array[j] = zero_array[j]+1;
        else
            one_array[j] = one_array[j]+1;    
    }
}

// so now we have 2 arrays, with the count of how many zeros and ones by position
for (var i=0; i < line_len;i++){
    if (zero_array[i] > one_array[i]) {
        gamma_rate.push ('0');
        epsilon_rate.push ('1');
    }
    else {
        gamma_rate.push ('1');
        epsilon_rate.push ('0');
    }

}
// get the gamma and epsilon binary
gamma_binary = gamma_rate.join('');
epsilon_binary = epsilon_rate.join('');
gamma_base10 = parseInt(gamma_binary,2);
epsilon_base10 = parseInt(epsilon_binary,2);

console.log (' gamma %i' , gamma_base10);
console.log (' epsilon_rate %i' , epsilon_base10);
product = gamma_base10 * epsilon_base10;
console.log ('\n product %i' , product);
