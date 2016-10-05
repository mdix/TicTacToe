"use strict";

import TicTacToe from '../../src/module/TicTacToe'

let ticTacToe
beforeEach(() => {
    ticTacToe = new TicTacToe()
})

describe(`TicTacToe`, () => {
    it(`should have an array initialized with 9 times null used for the playground`, () => {
        expect(ticTacToe._playground).toEqual([null,null,null,null,null,null,null,null,null])
    })
    describe(`should have setX and setO methods that`, () => {
        it(`should be chainable`, () => {
            ticTacToe.setX(2).setO(2).setX(2)
            expect(ticTacToe.constructor).toBe(TicTacToe)
        })
        it(`should set a field to 'x' at a certain position`, () => {
            ticTacToe.setX(2)
            expect(ticTacToe._playground[2]).toBe(`x`)
        })
        it(`should set a field to 'o' at a certain position`, () => {
            ticTacToe.setO(4)
            expect(ticTacToe._playground[4]).toBe(`o`)
        })
        it(`should not override after a value that has already been set (setX as second call)`, () => {
            ticTacToe.setO(3).setX(3)
            expect(ticTacToe._playground[3]).toBe(`o`)
        })
        it(`should not override after a value that has already been set (setO as second call)`, () => {
            ticTacToe.setX(6).setO(6)
            expect(ticTacToe._playground[6]).toBe(`x`)
        })

        const NOT_A_NUMBER = [null, undefined, `5`, {}, [], () => {}];
        NOT_A_NUMBER.forEach((noNumber) => {
            it(`should throw wrong type if not a number given`, () => {
                expect(() => {ticTacToe.setX(noNumber)}).toThrowError(`${noNumber} is not a number.`)
                expect(() => {ticTacToe.setO(noNumber)}).toThrowError(`${noNumber} is not a number.`)
            })
        })

        const OUT_OF_BOUNDS_NUMBERS = [-5, -1, 9, 15];
        OUT_OF_BOUNDS_NUMBERS.forEach((number) => {
            it(`should throw out of bounds if value < 0 || > 8`, () => {
                expect(() => {ticTacToe.setX(number)}).toThrowError(`${number} is out of bounds, range is 0..8.`)
                expect(() => {ticTacToe.setO(number)}).toThrowError(`${number} is out of bounds, range is 0..8.`)
            })
        })
    })
    describe(`should have a currentStatus method that`, () => {
        const WINNING_COMBINATIONS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [3,4,6]]
        WINNING_COMBINATIONS.forEach((positions) => {
            it(`should return 'x-won' if 'x' won`, () => {
                ticTacToe.setX(positions[0]).setX(positions[1]).setX(positions[2])
                expect(ticTacToe.currentStatus()).toBe(`x-won`)
            })
        })
        WINNING_COMBINATIONS.forEach((positions) => {
            it(`should return 'o-won' if 'o' won`, () => {
                ticTacToe.setO(positions[0]).setO(positions[1]).setO(positions[2])
                expect(ticTacToe.currentStatus()).toBe(`o-won`)
            })
        })
        it(`should return 'running' if no move made yet`, () => {
            expect(ticTacToe.currentStatus()).toBe(`running`)
        })

        const RUNNING_COMBINATIONS = [[0,1,4], [3,5,6], [0,4,7]]
        RUNNING_COMBINATIONS.forEach((positions) => {
            it(`should return 'running' if nobody won & still moves left`, () => {
                ticTacToe.setO(positions[0]).setO(positions[1]).setO(positions[2])
                expect(ticTacToe.currentStatus()).toBe(`running`)
            })
            it(`should return 'running' if nobody won & still moves left`, () => {
                ticTacToe.setX(positions[0]).setX(positions[1]).setX(positions[2])
                expect(ticTacToe.currentStatus()).toBe(`running`)
            })
        })

        const DRAW_COMBINATIONS = [{x: [1,2,3,6,8], o: [0,4,5,7]}, {x: [0,4,5,6,7], o: [1,2,3,8]}]
        DRAW_COMBINATIONS.forEach((positions) => {
            it(`should return 'draw' if nobody won & no moves left`, () => {
                positions.x.forEach(position => ticTacToe.setX(position))
                positions.o.forEach(position => ticTacToe.setO(position))

                expect(ticTacToe.currentStatus()).toBe(`draw`)
            })
        })
    })
})