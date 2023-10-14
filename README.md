# This is Key!
*Desciption of app*

*Access link *

## User Stories

### First Time Visitor Goals
-
-

### Returning Visitor Goals
-
-

### Frequent Visitor Goals
-
-


## Features

### Landing Page
- Rules
- Play Game

### Topics
- Select topic from subject of biology

### Game Play
- word definition
- Input letter field
- Incorrect guessed letters display
- Correct letters/word display
- Current score display 
<!-- - Picture which changes with each guess (EXTRA FEAT.) -->

### End of Game Display
- Correct word displayed
- Definition of word
- API generated pronounciation of word/ dictionary definition
- 'ok' button

### End of Game Options
- Next word button
- Change topic button
- Finished button

## Technologies Used
*Create link for each and desciption of use*
- HTML
- CSS
- JavaScript
- CSS Flexbox
- Figma
- VSCode
- Git
- GitHub

## Logic Flowchart 

## Wireframes 

## Design Choices

### Colours
![Chosen colour pallet](documentation/readme_images/colours.png)
I used [coolors](https://coolors.co/276fbf-3d3b30-f0a202-7fb800-bcd8c1) to create a colour pallet for this game. I chose colours which are typically considered gender neutral so that it would be visually appealing to any pupil, regardless of gender. I also aimed for colours which were bright and positive so to keep the user's attention and to keep them motivated. If they are feeling positive and happy when using the application, I believe they are more likely to learn and retain keyword information. 

The blue colour was chosen specifically to be calming and therefore prevent distraction.

The grey is a warm grey which I hoped would create a warmer, happier, and therefore a more positive experience than a colder grey would. I wanted a darker colour like this for contrast and to add atmosphere selectively.

the orange/yellow colour was chosen to be positive, exciting and tell the user that they are going to have fun playing this game. The aim of the game is to allow the user to learn while having fun, so it's important that the colours feel 'fun'.

The green is useful for positive feedback when a letter or word is guessed correctly. It is a bright green which feels healthy and clean which I felt conveyed positive and productive feelings which I hoped to project on the user. 

The lighter colour is also important for highlighting areas and contrast. It is bright to make the game feel clean and positive which again projects productive feelings and positive energy.

### Fonts
![Barrio font family]
For the logo and headings I chose the font family 'Barrio'. It is fun, playful and expressive which makes the game feel lighter and gives the first impression that this game will be fun and not 'just more revision'.

![Quicksand font family]
For slogans and quoted text such as definitions which don't direct or instruct the user, I used the font 'Quicksand'. This is also soft and friendly which makes it more accessible for pupils who want to have fun while learning. 

![Poppins font family]
For text that directly addresses the user, I have used a 'Poppins' which is a less rounded and soft than 'Quicksand' but is more assertive as this text is giving direction. It is still quite rounded so isn't harsh. It is chosen as it has similarities with the other two fonts which I felt added continuity between text areas. 

## Bugs

### Resolves Bugs

- #### updateWordProgress() function
    The 'updateWordProgress()' function wasn't working for a long period. Initially I was using advanced JavaScript to replace unguessed letters with underscores but found that when this wasn't working it was too difficult to identify the problem with tests. I replaced the advancedJavascript as seen in the first image:
    ![Advanced JavaScript updateing each letter in the word with underscores](documentation/readme_images/underscore_incorrect.png)
    Instead I wrote this function using a 'for' loop and identifying if the guessed letter matched the letter in this position in the keyword. This is shown in this image:
    ![Updated underscore function](documentation/readme_images/underscore_fixed.png)

- #### checLetter() funcion
    checkLetter() stopped preventing the user from submitting multiple letters at once or numbers. To resolve this bug, I first used 'console.log()' to identify where the problem was and then changed individual sections of the code and tested it each time to see if the changes were affective. The solution in the end was to correct the 'if' statement for 'guessValid'.
    The first images shows the user of 'numberOfCharacters' and 'validGuess === true'.
    ![initial code that needed correcting](documentation/readme_images/valid_guess_incorrect.png)
    The second image shows that when replacing this 'validGuess !== -1', it disallows double character guesses as well and it identified letter characters more affectively as well. This meant I could remove the 'numberOfCharacters' 'if' statement.
    ![Corrected code](documentation/readme_images/valid_guess_fixed.png)

- #### Keywords containing spaces can't be completed
    If the keyword contains a space or dash, the user is unable to correctly guess the whole word (they can only guess letters, not special characters). See this bug below:
    ![Unable to correctly guess whole word](documentation/readme_images/space_error.png)
    I initially added spaces to the 'possibleLetters' array, but for better UX these shouldn't appear as underscores to begin with. I found that a solution to this was to add a couple of lines to the 'if statement'  in the updateWordProgress function. The addition is displayed below and highlighted. 
    ![Code to correct spaces bug](documentation/readme_images/spaces_correct.png)

- #### Minus scores displayed 
    If the user has more 'losses' than 'wins', the 'Current Score:' displays negative numbers. This is evidenced below.
    ![Minus points can be displayed as the current score](documentation/readme_images/current_score_bug.png)
    This doesn't create a good experience for the user so I wanted to make sure the score could not go lower than '0'. To resolve this bug I added an 'if statement' to the removePoint() function. See below.
    ![Minus points display resolved](documentation/readme_images/current_score_fix.png)

- #### Duplicated 'newWord' function
    When the user clicks on the menu, in the top right, and selects 'new word', the new word function is called as it should be and nothing apears to be wrong. But when I displayed the keywordIndexOptions in the console, which should have one removed every time 'newWord' is called, I could see that two words were removed every time. This meant that the function was being called twice, though it wasn't immediately obvious where. I found that I had an event listener in my script.js and my game.js file which called the newGame function. As mentioned this, wasn't immediately obvious as the event listener in the script.js file called the function 'showGamePlay' which called in 'newWord' function inside it. 
    To resolve this bug, I removed the event listener in game.js, as the job of this event listener was already being completed by the script.js event listener.


### Unresolves Bugs

- #### querySelectorAll not working with showModal method.
    I found that when I used dialog modals and added event listeners to more than one element by using 'querySelectorAll' or 'getElementByClass', an error came up saying that '.addEventListener is not a function'. This is because an array was returned when getting multiple elements. To overcome this issue I itterated through the returned array and added an event listener within the for loop. This was successful when adding an event listener to display the home screen, for example, but the exact same method returned the original error when trying to apply it to the modals. 
    I was unable to resolve this bug to the extent I would have liked, but to allow the game to continue functioning, I added event listeners onto the ID of multiple elements. This is something I intend to look into and resolve when I am not working to a deadline. 

- #### New Game error message in console. 

## Testing

### Compatibility
Compatability Table
- #### Chrome
- #### Safari
- #### Edge
- #### Firefox


### Responsiveness
Could include videos here 
- #### Phone
- #### Tablet
- #### Desktop

### Validator Testing
- #### HTML with W3C
- #### CSS with W3C
- #### JS with JSHint?

### Accessibility and Performance
Lighthouse 

## Deployment 
Githube pages. Explain how it was deployed.

## Local Deployment
How to make a local copy by cloning

## Credits

- ### Content
    - Keywords and definitions taken from BBC Bitesize's (ADD LINK) glossary.
    - Pronounciation created using API dictionary.
    - Inspiration for the project came from my partner who teaches biology in secondary school and is always looking for quick educational activities for the pupils at the start of each lesson.

- ### Media
    - #### images list with links
        - [cells.jpg](https://unsplash.com/photos/-EmQO64JwoA)
        - [digestion.jpg](https://unsplash.com/photos/mjP6MQz834E)
        - [respiration.jpg](https://unsplash.com/photos/mkMSXR86kYY)
        - [letters.jpeg](https://unsplash.com/photos/Y6tGu-OH8lA)
        - [books.jpg](https://unsplash.com/photos/Oaqk7qqNh_c)
        - [sweets.jpg](https://unsplash.com/photos/PL5FZkW0Qkk)
        - [notes.jpg](https://unsplash.com/photos/HUuWNQmW58A)

    - #### Compression
    https://compressjpeg.com/

## Acknowledgements

## Future Improvements 





