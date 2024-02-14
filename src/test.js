const arr = [1, 2, [3, 4], [5, [6, 7]]];

function flat(array) {  
	 let op =  array.reduce((acc, current) => { 
		if (Array.isArray(current)) { 
			 acc = acc.concat( flat(  current  ));
		} else { 
			acc.push(current);
		}
		return acc
	}, []);
	 return op
}

let op = flat(arr);
console.log("op", op);
