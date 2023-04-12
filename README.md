# reversi-ui
Reversi UI written in JavaScript.

## What you can do
- Auto resize
- Customize style
- Update/Reset UI state

## How to use


## Methods
- ReversiBoard class
    | Name | Description | Argument |
    | --- | --- | --- |
    | update | update board state with array | 8x8 int array|
    | reset | reset board state (no stones, only empty board) | no argument |
    | resize | resize board (board size follows container element width) | no argument |

## Customize board
You can customize reversi UI when creating a ReversiBoard instance.

``` JavaScript
// configurations
let config = {
    styleStoneWhite: "Blue",
    styleStoneBlack: "Red",
}

// create ReversiBoard instance
let reverbiBoard = new ReversiBoard("root", config);
```

### Board configurations
- State
    | key | description |type | default value |
    | --- | --- | --- | --- |
    | stateCellEmpty | | Number | 0 |
    | stateCellAvailable | | Number | 1 |
    | stateStoneWhite | | Number | 2 |
    | stateStoneBlack | | Number | 3 |

- Style
    | key | description |type | default value |
    | --- | --- | --- | --- |
    | styleStoneWhite | white stone color. | String | "white" |
    | styleStoneBlack | black stone color. | String | "black" |
    | styleStoneWhiteBorderColor | white stone border color. | String | "white" |
    | styleStoneBlackBorderColor | black stone border color. | String | "black" |
    | styleCellEmpty | empty cell color. | String | "green" |
    | styleCellAvailable | available cell color. | String | "darkgreen" |
    | styleCellBorderColor | cell border color. | String | "black" |
    | styleDotColor | Four dots color. | String | "black" |

- id & classname
    | key | description |type | default value |
    | --- | --- | --- | --- |
    | idReversiBoard | | String | "reversiboard" |
    | classNameLayer | | String | "reversiboard-layer" |
    | classNameRow | | String | "reversiboard-row" |
    | classNameCell | | String | "reversiboard-cell" |
    | classNameStone | | String | "reversiboard-stone" |
    | classNameDot | | String | "reversiboard-dot" |
    | classNameDot | | String | "reversiboard-dot" |
    | classNameMesh | | String | "reversiboard-mesh"

- Event function
    | key | description |type | default value |
    | --- | --- | --- | --- |
    | eventFunc | event function when a cell clicked. event function can receive values i, j, state ( same variables & order, definitely ). i, j is board coordinate, state is board state number.| function | function(i, j, state) { console.log("click (x=" + i + ", y=" + j + ")"); } |


- Default configration
    ``` JavaScript
    {
        // state
        stateCellEmpty: 0,
        stateCellAvailable: 1,
        stateStoneWhite: 2,
        stateStoneBlack: 3,
        
        // style
        styleStoneWhite: "white",
        styleStoneBlack: "black",
        styleStoneWhiteBorderColor: "white",
        styleStoneBlackBorderColor: "black",
        styleCellEmpty: "green",
        styleCellAvailable: "darkgreen",
        styleCellBorderColor: "black",
        styleDotColor: "black",
        
        // id and classname
        idReversiBoard: "reversiboard",
        classNameLayer: "reversiboard-layer",
        classNameRow: "reversiboard-row",
        classNameCell: "reversiboard-cell",
        classNameStone: "reversiboard-stone",
        classNameDot: "reversiboard-dot",
        classNameMesh: "reversiboard-mesh",

        // event function
        eventFunc: function(i, j, state) {
            console.log("click (x=" + i + ", y=" + j + ")");
        }
    }
    ```