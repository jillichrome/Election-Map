var onBallet = function(name, partyColor) {
  var politican = {};
  politican.name = name;
  politican.electionResults = null;
  politican.totalVotes = 0;
  politican.partyColor = partyColor;

  politican.countVotes = function() {
    for(var i = 0; i<this.electionResults.length; i++) {
      this.totalVotes = this.totalVotes + this.electionResults[i];
    }
  };

  return politican;
};

var candidate1 = onBallet("Warren", [11, 45, 132]);
var candidate2 = onBallet("Sanders", [76, 210, 237]);

candidate1.electionResults = [5,1,7,2,33,6,4,2,1,14,8,
3,1,11,11,0,5,3,3,3,7,4,8,9,3,7,2,2,4,2,8,3,
15,15,2,12,0,4,13,1,3,2,8,21,3,2,11,1,3,7,2];

candidate2.electionResults = [4,2,4,4,22,3,
3,1,2,15,8,1,3,9,0,6,1,5,5,1,3,7,8,1,3,3,1,
3,2,2,6,2,14,0,1,6,7,3,7,3,6,1,3,17,3,1,2,11,
2,3,1];

candidate1.electionResults[4] = 17;
candidate1.electionResults[9] = 1;
candidate1.electionResults[43] = 11;

candidate2.electionResults[4] = 38;
candidate2.electionResults[9] = 28;
candidate2.electionResults[43] = 27;

var winner;

var setStateResults = function(state) {
  theStates[state].winner = null;

  if(candidate1.electionResults[state] > candidate2.electionResults[state]) {
    theStates[state].winner = candidate1;
  } else if(candidate1.electionResults[state] < candidate2.electionResults[state]) {
    theStates[state].winner = candidate2;
  }

  var stateWinner = theStates[state].winner;

  if(stateWinner !== null) {
    theStates[state].rgbColor = stateWinner.partyColor;
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  }

  var countryTableInfo = document.getElementById('countryResults');
  var row = countryTableInfo.children[0].children[0];

  row.children[0].innerText = candidate1.name;
  row.children[1].innerText = candidate1.totalVotes;
  row.children[2].innerText = candidate2.name;
  row.children[3].innerText = candidate2.totalVotes;
  row.children[5].innerText = winner;


  var stateInfoTable = document.getElementById('stateResults');

  var header = stateInfoTable.children[0];
  var body = stateInfoTable.children[1];
  var stateName = header.children[0].children[0];
  var abbreviation = header.children[0].children[1];
  var politician1Name = body.children[0].children[0];
  var politician2Name = body.children[1].children[0];
  var politician1Results = body.children[0].children[1];
  var politician2Results = body.children[1].children[1];
  var winnersName = body.children[2].children[1];

  stateName.innerText = theStates[state].nameFull;
  abbreviation.innerText = "(" + theStates[state].nameAbbrev +")";

  politician1Name.innerText = candidate1.name;
  politician2Name.innerText = candidate2.name;

  politician1Results.innerText = candidate1.electionResults[state];
  politician2Results.innerText = candidate2.electionResults[state];

  if(theStates[state].winner === null) {
    winnersName.innerText = "Draw";
  } else {
    winnersName.innerText = theStates[state].winner.name;
  }
};

candidate1.countVotes();
candidate2.countVotes();

if(candidate1.totalVotes > candidate2.totalVotes) {
  winner = candidate1.name;
} else if(candidate1.totalVotes < candidate2.totalVotes) {
  winner = candidate2.name;
} else {
  winner = "Draw";
}

console.log("The winner is " + winner);
