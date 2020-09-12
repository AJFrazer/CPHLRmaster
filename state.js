var caliCite = getCaliStuff()
function getCaliStuff(){
    var bottomLineContainer = document.getElementsByClassName("co_hAlign1")
    var bottomLine =  bottomLineContainer[bottomLineContainer.length - 1]
    if(bottomLine != null){
    var bottomLineText = bottomLine.textContent
    var caliSubject = bottomLineText.match(/Cal(.*?)Code/ig)
    console.log(caliSubject)
    return caliSubject
    }else{
        return 'not california'
}
}

var illCite = getIllStuff()
function getIllStuff(){
    var metaValues = document.getElementById('co_document').nextSibling.value
    var objMetaValues = JSON.parse(metaValues)
    var metaCite = objMetaValues.cite
    var citeArray = metaCite.split(' ');
    partOfIl = citeArray[3]
    return partOfIl
}

var mdCite = getMdStuff()
function getMdStuff(){
    var bottomLineContainer = document.getElementsByClassName("co_hAlign1")
    var bottomLine =  bottomLineContainer[bottomLineContainer.length - 1]
    if (bottomLine != null){
    var bottomLineText = bottomLine.textContent
    var mdSubject = bottomLineText.match(/MD Code\,(.*?)\,/ig)
    console.log(mdSubject)
    if (mdSubject != null){
        var mdSubj = mdSubject[0]
        var mdEdit = mdSubj.replace('MD Code,', 'Md. Code,')
        return mdEdit
    }else{
        return 'this was not maryland'
    }
}else{
    return 'hmmm something is not right'
}

}

var genCite = getDeStuff()
function getDeStuff(){
    var metaValues = document.getElementById('co_document').nextSibling.value
    var objMetaValues = JSON.parse(metaValues)
    var metaCite = objMetaValues.cite
    var citeArray = metaCite.split(' ');
    partOfIl = citeArray[3]
    return partOfIl
}

var maCite = getMaStuff()
function getMaStuff(){
    var metaValues = document.getElementById('co_document').nextSibling.value
    var objMetaValues = JSON.parse(metaValues)
    var metaCite = objMetaValues.cite
    var citeArray = metaCite.split(' ');
    partOfIl = citeArray[2]
    return partOfIl
}

var nyCite = getNyStuff()
function getNyStuff(){
    var bottomLineContainer = document.getElementsByClassName("co_hAlign1")
    var bottomLine =  bottomLineContainer[bottomLineContainer.length - 1]
    if (bottomLine != null){
        var bottomLineText = bottomLine.textContent
        var nySubject = bottomLineText.match(/McKinney\'s(.*?)§/ig)
        if (nySubject != null){
            var NySubj = nySubject[0]
            var NyEdit = NySubj.replace("McKinney's", 'N.Y.')
            return NyEdit
        }else{
            return'this is not Ny'
        }
    }else{
        return 'not the big apple???'
    }
}

var paCite = getPaStuff()
function getPaStuff(){
    var metaValues = document.getElementById('co_document').nextSibling.value
    var objMetaValues = JSON.parse(metaValues)
    var metaCite = objMetaValues.cite
    var citeArray = metaCite.split(' ');
    partOfIl = citeArray[2]
    return partOfIl
}

var txCite = getTxStuff()
function getTxStuff(){
    var bottomLineContainer = document.getElementsByClassName("co_hAlign1")
    var bottomLine =  bottomLineContainer[bottomLineContainer.length - 1]
    if (bottomLine != null){
    var bottomLineText = bottomLine.textContent
    var txSubject = bottomLineText.match(/V\. T\.(.*?)§/ig)
    if(txSubject != null){
        // var TxSubj = txSect[0]
        var txSect = txSubject[0].replace(' §', '')
        var TxEdit = txSect.replace('V. T. C. A.,', 'Tex.')
        return TxEdit
    }else{
        return 'why did you try to mess with texas?'
    }
    }else{
        return 'never mess with texas'
    }
}

var statePrefixes = {
    Alabama: 'Ala. Code ',
    Alaska: 'Alaska Stat. ',
    Arizona: 'Ariz. Rev. Stat. ',
    Arkansas: 'Ark. Code ',
    Colorado: 'Colo. Rev. Stat. ',
    Connecticut: 'Conn. Gen. Stat. ',
    'District of Columbia': 'D.C. Code ',
    Florida: 'Fla. Stat. ',
    Georgia: 'Ga. Code ',
    Hawaii: 'Haw. Rev. Stat. ',
    Idaho: 'Idaho Code ',
    Indiana: 'Ind. Code ',
    Iowa: 'Iowa Code ',
    Kansas: 'Kan. Stat. ',
    Kentucky: 'Ky. Rev. Stat. ',
    Louisiana: 'La. Rev. Stat. ',
    Michigan: 'Mich. Comp. Laws ',
    Minnesota: 'Minn. Stat. ',
    Mississippi: 'Miss. Code ',
    Missouri: 'Mo. Rev. Stat. ',
    Montana: 'Mont. Code ',
    Nebraska: 'Neb. Rev. Stat. ',
    Nevada: 'Nev. Rev. Stat. ',
    'New Hampshire': 'N.H. Rev. Stat. ',
    'New Jersey': 'N.J. Stat. ',
    'New Mexico': 'N.M. Stat. ',
    'North Carolina': 'N.C. Gen. Stat. ',
    'North Dakota': 'N.D. Cent. Code ',
    Ohio: 'Ohio Rev. Code ',
    Oregon: 'Or. Rev. Stat. ',
    'Rhode Island': 'R.I. Gen. Laws ',
    'South Carolina': 'S.C. Code ',
    'South Dakota': 'S.D. Codified Laws ',
    Tennessee: 'Tenn. Code ',
    Utah: 'Utah Code ',
    Virgnia: 'Va. Code ',
    Washington: 'Wash. Rev. Code ',
    'West Virginia': 'W. Va. Code ',
    Wyoming: 'Wyo. Stat. ',
    Illinois: illCite + ' Ill. Comp. Stat. ',
    California: caliCite,
    Maryland: mdCite + ' ',
    Delaware: 'Del. Code tit. ' + genCite + ', ',
    Maine: 'Me. Rev. Stat. tit. ' + genCite + ', ',
    Massachusetts: 'Mass. Gen. Laws ch. ' + maCite + ', ',
    'New York': nyCite + ' ',
    Oklahoma: 'Okla. Stat. tit. ' + genCite + ', ',
    Pennsylvania: paCite + ' PA. Cons. Stat. ' ,
    Vermont: 'Vt. Stat. tit. ' + genCite + ', ',
    Wisconsin: 'Wis. Stat. § ', //The problem state...
    Texas: txCite + ' '
}



// adds grandList to sync.storage
chrome.storage.sync.set({
    'list' : grandList,
}, function() {
    console.log("sent grand list!!!");
});


// adds grandList to sync.storage
chrome.storage.sync.set({
    'objets' : setMeta(),
}, function() {
    console.log('you saved un objet de loi!')
});



function getMetaData(){
    var metaValues = document.getElementById('co_document').nextSibling.value   //get westlaw internal element with hidden meta info on law
    var metaWest = JSON.parse(metaValues)                                  //parse into an object
    console.log(metaWest)
    console.log('that was meta west original')
    return metaWest
}

function setMeta(){
    var metaWest = getMetaData()
    console.log(metaWest)
    console.log('that was meta west')
    // var state = metaWest.jurisdictionText
    var metaPhlr = {
        citeWest : metaWest.cite,
        lawType : metaWest.contentType,
        citeAsLink : metaWest.functionalCite,
        stateAbbrev : metaWest.jurisdiction,
        stateAsterisk : metaWest.jurisdictionFacet,
        stateTitle : metaWest.jurisdictionText,
        lawTitle : metaWest.titleText,
        phlrCite: getPhlrCite(metaWest),
        creditsString: getCredits()
    }
    console.log(metaPhlr)
    return metaPhlr
}

setMeta()

function getCredits(){                    //This is to get the dates and other credit info
    if(getStateTitle() == 'Ohio'){
        var credits = document.getElementById('co_anchor_Credits').childNodes[1].textContent
        return credits
    }else{
    var credits = document.getElementById('co_anchor_Credits').nextSibling.childNodes[0].textContent
    console.log('credits are: ' + credits)
    return credits
    }
}



function getPhlrCite(meta){
    console.log(meta)
    var oldMeta = getMetaData()
    var state = oldMeta.jurisdictionText
    console.log(state)
    newCite = statePrefixes[state] + oldMeta.titleText
    console.log(newCite)

    // var meta.phlrCite = newCite
    console.log(newCite)
    return newCite
    }


function getStateTitle(){
    var metaValues = document.getElementById('co_document').nextSibling.value
    var objMetaValues = JSON.parse(metaValues)
    var stateTitle = objMetaValues.jurisdictionText
    return stateTitle
    }


    function loggg(msg){
        alert(msg)
    }

// Creates array of the values established above to send them to popup.js
var grandList = ['0', 
    getCredits(),
    getStateTitle(),
    // getStateCite(),
    setMeta()
];


