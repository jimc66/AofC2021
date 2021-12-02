const fs = require('fs')
var depth_array_string = fs.readFileSync ('day1.txt').toString().split("\n");
var depth_array_num = [];
var increase = 0;
for (i in depth_array_string) {
    depth_array_num.push (Number(depth_array_string[i]));
    console.log (depth_array_string[i]);

}

num_items = depth_array_num.length;

for (var i = 0; i < num_items-3; i++){
    num1 = depth_array_num[i] +depth_array_num[i+1] +depth_array_num[i+2];
    num2 = depth_array_num[i+1] +depth_array_num[i+2] +depth_array_num[i+3];

    if (num1 < num2)
        increase++;
}

console.log (increase);
