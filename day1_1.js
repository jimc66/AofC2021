const fs = require('fs')
var depth_array_string = fs.readFileSync ('day1.txt').toString().split("\n");
var depth_array_num = [];
var increase = 0;
for (i in depth_array_string) {
    depth_array_num.push (Number(depth_array_string[i]));
    console.log (depth_array_string[i]);

}

num_items = depth_array_num.length;

for (var i = 0; i < num_items; i++){
    if (depth_array_num[i] < depth_array_num[i+1])
        increase++;
}

console.log (increase);

