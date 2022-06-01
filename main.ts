radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Asleep)
        soundExpression.yawn.play()
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Happy)
        game.addScore(1)
        soundExpression.happy.play()
    } else if (receivedNumber == 0) {
        basic.showIcon(IconNames.Sad)
        soundExpression.sad.play()
    }
    
    basic.pause(1000)
    reset()
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    basic.showString("R")
    choice = 0
    radio.sendString("R")
    while (opponent == "none") {
        basic.pause(2000)
    }
})
function judge() {
    if (opponent == "R") {
        if (choice == 0) {
            basic.showIcon(IconNames.Asleep)
            radio.sendNumber(1)
            soundExpression.yawn.play()
        } else if (choice == 1) {
            basic.showIcon(IconNames.Happy)
            game.addScore(1)
            radio.sendNumber(0)
            soundExpression.happy.play()
        } else {
            basic.showIcon(IconNames.Sad)
            radio.sendNumber(2)
            soundExpression.sad.play()
        }
        
    } else if (opponent == "P") {
        if (choice == 0) {
            basic.showIcon(IconNames.Sad)
            radio.sendNumber(2)
            soundExpression.sad.play()
        } else if (choice == 1) {
            basic.showIcon(IconNames.Asleep)
            radio.sendNumber(1)
            soundExpression.yawn.play()
        } else {
            basic.showIcon(IconNames.Happy)
            game.addScore(1)
            radio.sendNumber(0)
            soundExpression.happy.play()
        }
        
    } else if (choice == 0) {
        basic.showIcon(IconNames.Happy)
        game.addScore(1)
        radio.sendNumber(0)
        soundExpression.happy.play()
    } else if (choice == 1) {
        basic.showIcon(IconNames.Sad)
        radio.sendNumber(2)
        soundExpression.sad.play()
    } else {
        basic.showIcon(IconNames.Asleep)
        radio.sendNumber(1)
        soundExpression.yawn.play()
    }
    
    basic.pause(500)
    reset()
}

input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    basic.showString("S")
    choice = 2
    radio.sendString("S")
    while (opponent == "none") {
        basic.pause(2000)
    }
})
radio.onReceivedString(function on_received_string(receivedString: string) {
    
    if (receivedString == "loser") {
        basic.showString("You Lose.")
        control.reset()
    } else {
        opponent = receivedString
    }
    
    while (!(choice == 9)) {
        basic.pause(2000)
        judge()
    }
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    basic.showString("P")
    choice = 1
    radio.sendString("P")
    while (opponent == "none") {
        basic.pause(2000)
    }
})
function reset() {
    
    opponent = "none"
    choice = 9
    if (game.score() >= 3) {
        basic.showNumber(game.score())
        radio.sendString("loser")
        soundExpression.hello.playUntilDone()
        basic.pause(500)
        music.startMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.OnceInBackground)
        basic.showString("You Win!")
        basic.pause(5000)
        control.reset()
    } else {
        music.playTone(262, music.beat(BeatFraction.Quarter))
        basic.showNumber(game.score())
    }
    
}

let opponent = ""
let choice = 0
radio.setGroup(5)
game.setScore(0)
reset()
