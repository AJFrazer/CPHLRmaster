//Specialized logging of lists/arrays!//
function logg(x, y){
	console.log(' ')
	console.log('=====================================')
	console.log('Bewlow, please find: ' +  y)
	console.log('the type of variable is: ' + typeof(x))
	console.log(x)
	console.log('=====================================')
	console.log(' ')

}




async function performCopy() {
	let copiedText = [document.getElementById('laws').innerText]
	// event.preventDefault();
	try {
	   await navigator.clipboard.writeText(copiedText);
	   console.log(`${copiedText} copied to clipboard`);
	} catch (err) {
	   console.error('Failed to copy: ', err);
	}
 }
 
