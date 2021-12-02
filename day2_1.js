const fs = require('fs')
var file_name = 'day_2_1.txt';
var direction_array_string = fs.readFileSync (file_name).toString().split("\n");
var direction_array = [];
var direction_num = [];
var increase = 0;
for (i in direction_array_string) {
    one_liner_array = direction_array_string[i].split(" ");
    direction_array.push (one_liner_array[0]);
    direction_num.push (Number(one_liner_array[1]));
    console.log (direction_array[i]);
    console.log (direction_num[i]);
}

num_items = direction_array.length;

forward_movement = 0;
downward_movement = 0;

for (var i = 0; i < num_items; i++){
    if (direction_array[i] == 'forward')
        forward_movement = forward_movement +direction_num [i];
    if (direction_array[i] == 'down')
        downward_movement = downward_movement + direction_num[i];
    if (direction_array[i] == 'up')
        downward_movement = downward_movement - direction_num[i];  
}

console.log (' forward %i' , forward_movement);
console.log (' down %i' , downward_movement);
product = forward_movement * downward_movement;
console.log ('\n product %i' , product);
