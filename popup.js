const storage = chrome.storage.sync;
const lister = '<li>'
const unlister = '</li></li>'

getRunningCredits()

//======Listen for click and get credits/etc========//
chrome.browserAction.onClicked.addListener(function(tab) { getRunningCredits()})
chrome.browserAction.onClicked.addListener(function(tab) { getRunningObjs()})

//======Get Background Page =====//
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'state.js'
	});;
});

//========ADD Buttons==============//
function addButton(buttonId, buttonFx){
	document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById(buttonId);
	link.addEventListener('click', function() {
		buttonFx();
	});
});
}
addButton('citeButton', buttonUpdate)
addButton('clearButton', clearContents)
addButton('dlButton', buttonUpdateObj)
// addButton('copyButton', copyAll)



document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('saveButton');
	link.addEventListener('click', function() {
		let savingText = [document.getElementById('laws').innerHTML]
		saveText(savingText);
	});
}); 

document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('copyButton');
	link.addEventListener('click', function() {
		performCopy();
	});
}); 



//======Get RuningCredits and display ==============//
function getRunningCredits() {
	storage.get('runningCredits', function(items){
		if (items.runningCredits) {
			var runningCredits = items.runningCredits;
			logg(runningCredits, 'running credits')
			document.getElementById('laws').innerHTML = runningCredits.join('')
		}
	})
}


function buttonUpdate(){
	storage.get('list', function(items) {
		if (items.list) {
			var grandList = items.list; // this variable belongs to this scope
			// do here whatever you need with the retrieved info
			var state_Title = grandList[2]
			var citePhlr = grandList[3].phlrCite;
			var unformattedDates = grandList[1]
			var formattedDates = formatDates(unformattedDates, state_Title)
			var lawEntry = '<strong>' + citePhlr + '</strong> <br>' + formattedDates +'<br><br>'
			update(lawEntry)
			updateObj(grandList[3])

			}
		})
	}


function formatDates(unformattedDates, state_Title){
	var noParenthCredits = removeParenth(unformattedDates);    							// Removes the parentheses
	var noHistory = noParenthCredits.replace('HISTORY: ', '')
	var noSource = noHistory.replace('Source. ', '')
	var noSourceLine = noSource.replace(/Source:.*?;/ig, '') 
	var cleanedDates = formatMonths(noSourceLine)
	if(state_Title == 'District of Columbia'){
		var dcDates = getDcDates(cleanedDates)
		var joinedArray = dcDates.join('');
		var dates = '<ul>' + joinedArray + '</ul></ul></ul>'
		return dates
	}else if(state_Title == 'New Hampshire'){
		var dcDates = getNhDates(cleanedDates)
		var joinedArray = dcDates.join('');
		var dates = '<ul>' + joinedArray + '</ul></ul></ul>'
		return dates
	}else if(state_Title == 'Wisconsin'){
		alert("For Wisconsin, please navigate to the Editor's and Revisor's Notes tab to get credits")
	}else{
	var amendSplit = splitAmend(cleanedDates)
	console.log(amendSplit)
	console.log('^^^^^that separated the amended period sitch')
	var amendRecode = splitRecode(amendSplit)
	var datesEff = cleanUpEffectives(amendRecode);									// Returns cleaned up eff to Effectives
	var splitColon = splitColons(datesEff)												// Splits into array based on comma
	var editedArray = editArray(splitColon)
	var joinedArray = editedArray.join('');
	var dates = '<ul>' + joinedArray + '</ul></ul></ul>'
	// var dates = effectiveLine
	logg(dates, 'dates')
	return dates
}
}

function getDcDates(noParenthCredits){
	console.log(noParenthCredits)
	console.log('^^^THAT was DC without parentheses')
	var addedColon = noParenthCredits.replace(/D.C. Law/ig, ';D.C. Law')
	console.log(addedColon)
	var monthsEffed = DCformatMonths(addedColon)
	var arrayDates = monthsEffed.split(';')
	console.log('arrray below??')
	console.log(arrayDates)
	var revArray = arrayDates.reverse()
	console.log(revArray)
	var trimArray = revArray.map(string => {
		return string.trim()
	})
	console.log(trimArray)
	var noComma = trimArray.map(string => {
		return string.replace(/\,\s*$/, "")
	})
	console.log(noComma)
	var noPeriod = noComma.map(string => {
		return string.replace(/\.\s*$/, "")
	})
	console.log(noPeriod)
	




	var effDiffLines = noPeriod.map(string => {
		// return string.trim()
		return lister.concat(string, unlister)
	})
	var subBullets = effDiffLines.map(string => {
		return string.replace(/Effective/ig, '<ul><li>Effective')
	})
	var realSubBullets = subBullets.map(string => {
		if (string.includes('Effective')){
			return string.concat('</li></li></ul></ul>')
		}
		else{return string}
})
console.log(realSubBullets)
return realSubBullets
}

function getNhDates(unformattedDates){
	var noParenthCredits = removeParenth(unformattedDates);    							// Removes the parentheses
	var noSource = noParenthCredits.replace('Source. ', '')
	var cleanedDates = formatMonths(noSource)
	var datesEff = cleanUpEffectives(cleanedDates);
	var periodSep = splitPeriod(datesEff)

	var editedArray = editArray(periodSep)
		return editedArray
}



function splitAmend(dates){                // adds ; before amended language to split later
	return dates.replace(/\. Amended/ig, ';Amended')
}

function splitRecode(dates){
	return dates.replace('. Recodified', ';Recodified')
}

function splitPeriod(dates){
	var dateArray = dates.split('. ')
	console.log('here are the dates in an array separated by .')
	console.log(dateArray)
	return dateArray
}

function splitColons(dates){
	var dateArray = dates.split(';')
	console.log('here are the dates in an array separated by ;')
	console.log(dateArray)
	return dateArray
}

function editArray(dateArray){
	var spacelessDates = dateArray.map(string => {
		return string.trim()
	})
	var effDiffLines = spacelessDates.map(string => {
		// return string.trim()
		return lister.concat(string, unlister)
	})
	var subBullets = effDiffLines.map(string => {
		return string.replace(/Effective/ig, '<ul><li>Effective')
	})
	var realSubBullets = subBullets.map(string => {
		if (string.includes('Effective')){
			return string.concat('</li></ul>')
		}
		else{return string}
	})
	console.log(realSubBullets)
	console.log('^^^^^^^those are some spaceless credits!!!  ')
	var noTrail = realSubBullets.map(string => {
		return string.replace(/ </ig, '<')
	})
	console.log(noComma)
	var noComma = noTrail.map(string => {
			return string.replace(/\.</, '<')
		})
		console.log(noComma)
	var noPeriod = noComma.map(string => {
			return string.replace(/\,</, '<')
		})
		console.log(noPeriod)
	return noPeriod
}


function cleanUpEffectives(dates){
	var datesEffNoColon = dates.replace(/;Eff./ig, 'Effective')				//-Replaces ;Eff. with Effective 
	var datesEffNoColon2 = datesEffNoColon.replace(/; Eff./ig, 'Effective')		//-Replaces ; Eff. with Effective
	var datesEff = datesEffNoColon2.replace(/Eff./ig, 'Effective')				//-Replaces Eff. with Effective
	return datesEff					
}

function formatMonths(months){	
	var month1 =  months.replace(/Jan./ig, 'January')
	var month2 =  month1.replace(/Feb./ig, 'February')
	var month3 =  month2.replace(/Mar./ig, 'March')
	var month4 =  month3.replace(/Apr./ig, 'April')
	var month5 =  month4.replace(/Aug./ig, 'August')
	var month6 =  month5.replace(/Sept./ig, 'September')
	var month7 =  month6.replace(/Oct./ig, 'October')
	var month8 =  month7.replace(/Nov./ig, 'November')
	var month9 = month8.replace(/Dec./ig, 'December')
	return month9
}

function DCformatMonths(months){
	var month1 =  months.replace(/January/ig, 'Effective January')
	var month2 =  month1.replace(/February/ig, 'Effective February')
	var month3 =  month2.replace(/March/ig, 'Effective March')
	var month4 =  month3.replace(/April/ig, 'Effective April')
	var month5 =  month4.replace(/June/ig, 'Effective June')
	var month6 =  month5.replace(/July/ig, 'Effective July')
	var month7 =  month6.replace(/August/ig, 'Effective August')
	var month8 =  month7.replace(/September/ig, 'Effective September')
	var month9 =  month8.replace(/October/ig, 'Effective October')
	var month10 = month9.replace(/November/ig, 'Effective November')
	var month11 = month10.replace(/December/ig, 'Effective December')
	var month12 =  month11.replace(/May/ig, ';May')

	return month12
}


function effectiveToPeriod(datesEffMonth){
	let brokenUpEff = datesEffMonth.replace(/Effective.*?\./ig, (match) => { 
		return match.concat('<br>'); //method on string
	});
	return brokenUpEff
}


function removeParenth(credits){
	var noParenth = credits.replace(/[\(\)']+/g,'')
	var noBrack = noParenth.replace(/[\[\]']+/g,'')
	return noBrack
}


//=======UPDATES the running credits in html format on storage
function update(lawEntry){
	storage.get('runningCredits', function(items) {
		if (items.runningCredits) {
			var runningCredits = items.runningCredits; // this variable belongs to this scope
			// do here whatever you need with the retrieved info
			//=========THIS IS WHERE YOU WILL:===================//
			//======Add any text that requires the grand list ==//
			//=========usage and/or manipulaiton================//
			console.log(runningCredits);
			console.log(typeof runningCredits)
			if (typeof runningCredits != Array){
				let fullCredits = runningCredits
				fullCredits.push(lawEntry)
				setChromeStorage(fullCredits)
				updateTextField(fullCredits)
			}else{
			let fullCredits = [runningCredits]
			fullCredits.push(lawEntry)
			setChromeStorage(fullCredits)
			updateTextField(fullCredits)
		}}
		})
	}


function setChromeStorage(fullCredits){
	chrome.storage.sync.set({
			'runningCredits':fullCredits
			}, function() {
				console.log(fullCredits)
			}
	)}

function setChromeObjs(objs){
	chrome.storage.sync.set({
			'objs':fullCredits
			}, function() {
				console.log(fullCredits)
			}
	)}

//ACTUALLY it updates html div with mastersheet - not text field anymore
function updateTextField(fullCredits){
	storage.get('runningCredits', function(items) {
		if (items.runningCredits) {
				console.log(fullCredits)
				document.getElementById('laws').innerHTML = fullCredits.join('')
		}
	})
}

function updateTextFieldSaved(fullCredits){
	storage.get('runningCredits', function(items) {
		if (items.runningCredits) {
				console.log(fullCredits)
				document.getElementById('laws').innerHTML = fullCredits.join('')  //make sure didn't break
		}
	})
}


function clearContents(){
	let fullCredits = [];
	chrome.storage.sync.set({
		'runningCredits':fullCredits
		}, function() {
			console.log('hopefully cleared....')
			updateTextField(fullCredits)
		}
)}




function download(filename, text) {
	console.log(text)
	console.log(typeof text)
	console.log('that was from the DL function ^^^^')
	var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
	document.body.removeChild(element);''
	
  }



function updateObj(obj){
	storage.get('runningObjects', function(items) {
		if (items.runningObjects) {
			var runningObjects = items.runningObjects; // this variable belongs to this scope
			// do here whatever you need with the retrieved info
			//=========THIS IS WHERE YOU WILL:===================//
			//======Add any text that requires the grand list ==//
			//=========usage and/or manipulaiton================//
			console.log(runningObjects);
			console.log(typeof runningObjects)
			let allObjs = runningObjects
			allObjs.push(obj)
			setChromeObjs(allObjs)
			logg(allObjs, "allObjs")
			
			}
		})
	}


	function buttonUpdateObj(){
		storage.get('runningObjects', function(items) {
			// if (items.runningObjects) {
				var runningObjects = items.runningObjects;
				console.log(runningObjects)
				download("Mastersheet.txt", runningObjects)
		// }
			})
		}


function saveText(savingText){
	let fullCredits = savingText;
	chrome.storage.sync.set({
		'runningCredits':fullCredits
		}, function() {
			console.log('hopefully saved....')
			updateTextFieldSaved(fullCredits)
		}
)}


