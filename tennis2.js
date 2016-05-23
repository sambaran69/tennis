// Player Class
var Player = function(name) {
    this.name = name;
    this.pointsWon = 0;
    this.gamesWon = 0;
};

Player.prototype.wonAPoint = function() {
    this.pointsWon += 1;
};

Player.prototype.getPointsWon = function() {
    return this.pointsWon;
};

Player.prototype.wonAGame = function() {
    this.gamesWon += 1;
};

Player.prototype.getGamesWon = function() {
    return this.gamesWon;
};

Player.prototype.reset = function() {
    this.pointsWon = 0;
}


// Tennis Match class - Singles
var Match = function(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);

    this.currentGame = null;
    this.currentSet = null;
};

Match.prototype.start = function() {
    this.currentGame = new Game(this.player1, this.player2, this);
    return this.currentGame;
};

Match.prototype.start = function() {
    this.currentGame = new Game(this.player1, this.player2, this);
    return this.currentGame;
};

Match.prototype.nextGame = function() {
    this.player1.reset();
    this.player2.reset();
    return this.currentGame;
}

Match.prototype.getCurrentGame = function() {
    return this.currentGame;
};

Match.prototype.score = function() {
    return "Set Score:\n" + this.player1.name + ": " + this.player1.getGamesWon() + "\n" + this.player2.name + ": " + this.player2.getGamesWon();
}


// Tennis Game class
// TODO: the game class will need to be modifed for tie-breaker games as well
//       currently this is not a part of the requirement specifications
var Game = function(player1, player2, matchObj) {
    this.player1 = player1;
    this.player2 = player2;
    this.match   = matchObj;
    this.points  = ["Love", "15", "30", "40"];
}

Game.prototype.pointWonBy = function(playerName) {
    if (playerName == this.player1.name)
        this.player1.wonAPoint();
    else
        this.player2.wonAPoint();
};

Game.prototype.isGameOver = function() {
    var p1 = this.player1.getPointsWon();
    var p2 = this.player2.getPointsWon();

    if (Math.abs(p1 - p2) > 1 && (p1 > 3 || p2 > 3)) 
        return true;
    else
        return false;
};

Game.prototype.score = function() {
    var score, leading;
    var p1points = this.player1.getPointsWon();
    var p2points = this.player2.getPointsWon();

    if ((p1points < 4 && p2points < 4) && (p1points + p2points < 6)) {
        score = this.points[p1points];
        return (p1points == p2points) ? score + " All" : score + "-" + this.points[p2points];
    } 
    else {
        if (p1points == p2points)
            return "Deuce";
        leading = (p1points > p2points) ? this.player1 : this.player2;
        if (this.isGameOver() === true) {
            leading.wonAGame();
            this.match.nextGame();
            return "Win for " + leading.name;
        }
        else {
            return "Advantage " + leading.name;
        }
    }
};

// Tennis Scorer Interface Test

var match = new Match('player 1', 'player 2');
match.start();

var game = match.getCurrentGame();
// this will return "Love All"
console.log(game.score());

game.pointWonBy("player 1");
game.pointWonBy("player 2");
// this will return "15 All"
console.log(game.score());

game.pointWonBy("player 1");
game.pointWonBy("player 1");
// this will return "40-15"
console.log(game.score());

game.pointWonBy("player 2");
game.pointWonBy("player 2");
// this will return "Deuce"
console.log(game.score());

game.pointWonBy("player 2");
game.pointWonBy("player 2");
// this will return "Win for player 2"
console.log(game.score());
// this will return:
//  Set Score:
//  player 1: 0
//  player 2: 1
console.log(match.score());

// this will return "Love All"
console.log(game.score());
game.pointWonBy("player 2");
game.pointWonBy("player 2");
// this will return "Love-30"
console.log(game.score());

game.pointWonBy("player 2");
game.pointWonBy("player 2");
// this will return "Win for player 2"
console.log(game.score());
// this will return
//  Set Score:
//  player 1: 0
//  player 2: 2
console.log(match.score());
