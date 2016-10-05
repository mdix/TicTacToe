"use strict"

export default function TicTacToe() {
    this._playground = [null, null, null, null, null, null, null, null, null]
}

TicTacToe.prototype.setX = function(fieldPosition) {
    this._checkSetPrerequisite(fieldPosition)
    if (this._fieldAlreadySet(fieldPosition)) return this
    this._playground[fieldPosition] = `x`
    return this
}

TicTacToe.prototype.setO = function(fieldPosition) {
    this._checkSetPrerequisite(fieldPosition)
    if (this._fieldAlreadySet(fieldPosition)) return this
    this._playground[fieldPosition] = `o`
    return this
}

TicTacToe.prototype.currentStatus = function() {
    const WINNING_COMBINATIONS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [3,4,6]]
    const PG = this._playground

    let status = `running`
    WINNING_COMBINATIONS.forEach((comb) => {
        if (`${PG[comb[0]]}${PG[comb[1]]}${PG[comb[2]]}` === `xxx`) status = `x-won`
        if (`${PG[comb[0]]}${PG[comb[1]]}${PG[comb[2]]}` === `ooo`) status = `o-won`
    })

    if (status === `running` && !this._movesLeft()) status = `draw`

    return status
}

TicTacToe.prototype._checkSetPrerequisite = (fieldPosition) => {
    if (typeof fieldPosition !== `number`) throw new Error(`${fieldPosition} is not a number.`)
    if (fieldPosition < 0 || fieldPosition > 8) throw new Error(`${fieldPosition} is out of bounds, range is 0..8.`)
}

TicTacToe.prototype._fieldAlreadySet = function(fieldPosition) {
    return this._playground[fieldPosition] !== null
}

TicTacToe.prototype._movesLeft = function() {
    return this._playground.indexOf(null) !== -1
}