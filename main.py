def on_received_number(receivedNumber):
    if receivedNumber == 1:
        basic.show_icon(IconNames.ASLEEP)
        soundExpression.yawn.play()
    elif receivedNumber == 2:
        basic.show_icon(IconNames.HAPPY)
        game.add_score(1)
        soundExpression.happy.play()
    elif receivedNumber == 0:
        basic.show_icon(IconNames.SAD)
        soundExpression.sad.play()
    basic.pause(1000)
    reset()
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global choice
    basic.show_string("R")
    choice = 0
    radio.send_string("R")
    while opponent == "none":
        basic.pause(2000)
input.on_button_pressed(Button.A, on_button_pressed_a)

def judge():
    if opponent == "R":
        if choice == 0:
            basic.show_icon(IconNames.ASLEEP)
            radio.send_number(1)
            soundExpression.yawn.play()
        elif choice == 1:
            basic.show_icon(IconNames.HAPPY)
            game.add_score(1)
            radio.send_number(0)
            soundExpression.happy.play()
        else:
            basic.show_icon(IconNames.SAD)
            radio.send_number(2)
            soundExpression.sad.play()
    elif opponent == "P":
        if choice == 0:
            basic.show_icon(IconNames.SAD)
            radio.send_number(2)
            soundExpression.sad.play()
        elif choice == 1:
            basic.show_icon(IconNames.ASLEEP)
            radio.send_number(1)
            soundExpression.yawn.play()
        else:
            basic.show_icon(IconNames.HAPPY)
            game.add_score(1)
            radio.send_number(0)
            soundExpression.happy.play()
    else:
        if choice == 0:
            basic.show_icon(IconNames.HAPPY)
            game.add_score(1)
            radio.send_number(0)
            soundExpression.happy.play()
        elif choice == 1:
            basic.show_icon(IconNames.SAD)
            radio.send_number(2)
            soundExpression.sad.play()
        else:
            basic.show_icon(IconNames.ASLEEP)
            radio.send_number(1)
            soundExpression.yawn.play()
    basic.pause(500)
    reset()

def on_button_pressed_ab():
    global choice
    basic.show_string("S")
    choice = 2
    radio.send_string("S")
    while opponent == "none":
        basic.pause(2000)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global opponent
    if receivedString == "loser":
        basic.show_string("You Lose.")
        control.reset()
    else:
        opponent = receivedString
    while not (choice == 9):
        basic.pause(2000)
        judge()
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global choice
    basic.show_string("P")
    choice = 1
    radio.send_string("P")
    while opponent == "none":
        basic.pause(2000)
input.on_button_pressed(Button.B, on_button_pressed_b)

def reset():
    global opponent, choice
    opponent = "none"
    choice = 9
    if game.score() >= 3:
        basic.show_number(game.score())
        radio.send_string("loser")
        soundExpression.hello.play_until_done()
        basic.pause(500)
        music.start_melody(music.built_in_melody(Melodies.BIRTHDAY),
            MelodyOptions.ONCE_IN_BACKGROUND)
        basic.show_string("You Win!")
        basic.pause(5000)
        control.reset()
    else:
        music.play_tone(262, music.beat(BeatFraction.QUARTER))
        basic.show_number(game.score())
opponent = ""
choice = 0
radio.set_group(5)
game.set_score(0)
reset()