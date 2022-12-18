 /// Find My Hat
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// gameStatus checks if the game needs to be contionued or not
let gameStatus = true;

// Main class
class Field {
    constructor(field){
        this.field = field
    }
    // print the initial field map
    print(){
        let fieldArr = []
        for(let i=0; i<this.field.length; i++){
          fieldArr.push(this.field[i].join(''))
        }
        let finalField = fieldArr.join('\n')
        return finalField
    }
    
    // manipulate .print field map according to fieldpath
    validateFieldCharacter(outerI,innerI){
      // Checks if outerIndex is out of boundaries
      if(outerI >= 0 && outerI <= this.field.length){
        // Checks if innerIndex is out of boundaries
        if(innerI >= 0 && innerI <= this.field.length){
          // * (pathCharacter) -> '░' (fieldCharacter)

          if(this.field[outerI][innerI] === fieldCharacter){
            this.field[outerI][innerI] = pathCharacter;
           // * (pathCharacter) -> 'O' (hole)
           } else if (this.field[outerI][innerI] === hole){
               console.log('Sorry! you fell down a hole.')
               return gameStatus = false;
           // * (pathCharacter) -> '^' (hat)
           } else if (this.field[outerI][innerI] === hat){
               console.log('Congrats! you found your hat.')
               return gameStatus = false;
           }; 

        } else { // for innerBound
          console.log('Out of bounds.')
          return gameStatus = false;
        };
      } else { // for outerBound
        console.log('Out of bounds.')
        return gameStatus = false;
      };
    }

    // Custom field generator method 
    static generateField(height,width,percentage){
      //Helper function to return hole or fieldCharacter depening on percentage.
      const fieldOrHole = (percentage) => {
        if (percentage >= 0 && percentage <= 100) {
          const ranNum = Math.random() * 100;
          if (ranNum < percentage) {
            return hole;
          } else {
            return fieldCharacter;
          }
        } else {
          console.log('Please enter a number between 0 - 100');
        }
    }

      ////Helper function to return a plain field with no hat and pathCharacter
      const plainField = () => {
        function makeWidthArray() {
            let widthArray = [];
            for (let i=0; i < width; i++) {
                widthArray.push(fieldOrHole(percentage));
            }
            return widthArray;
        }
        let plainField = [];
        for (let i=0; i < height; i++) {
            plainField.push(makeWidthArray());
        }
        return plainField;
      }

      const gameReadyField = plainField();

      //Adding hat on gameReadyField, while loop will check if hat sits on * and will reposition if so
      do {
        gameReadyField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
      }   while (gameReadyField[0][0] == hat);
    
      //Adding pathCharacter to left-upper corner
      gameReadyField[0][0] = pathCharacter;

      return gameReadyField;
   }
};

const userInput = () => {
  // field address in two values (outerIndex,innerIndex)
  let outerIndex = 0;
  let innerIndex = 0;

  // direction guide for users
  process.stdout.write(`Directions:-\n r | R: right\n l | L: left\n u | U: up\n d | D: down\n\n`)

  let customHeigth = prompt(`height of field in blocks: `)
  let customwidth = prompt('width of field in blocks: ')
  //custom field newInstance
  const newfield = new Field(Field.generateField(customHeigth,customwidth,20));

  // prompt loop
  while(gameStatus){
    // calling instance class
    console.log(newfield.print())
    
    // input prompt
    let input = prompt(`Which direction: `)

    // direction to validateFieldCharacter
    if(input === "r" || input === "R"){
      outerIndex += 0, innerIndex += 1
    } else if(input === "l" || input === "L"){
      outerIndex += 0, innerIndex -= 1
    } else if(input === "d" || input === "D"){
      outerIndex += 1, innerIndex += 0
    } else if(input === "u" || input === "U"){
      outerIndex -= 1, innerIndex += 0
    };

    // validateFieldDirection method calling
    newfield.validateFieldCharacter(outerIndex,innerIndex)
  } 
   console.log('Game Over!')
};

// New instance added for FIELD class
const myField = new Field([
  ['*', '░', '░','░', 'O', '░'],
  ['░', 'O', 'O','░', '░', '░'],
  ['O', '░', '^','O', '░', 'O'],
  ['░', '░', 'O','░', '░', '░'],
  ['░', 'O', '░','░', 'O', '░'],
  ['░', '░', '░','░', '░', 'O'],
]);

// After user input the field map changes accordingly
userInput()