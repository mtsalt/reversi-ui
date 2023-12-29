# reversi-ui
Reversi UI written in JavaScript.

## What you can do
- Auto resize
- Customize style
- Update/Reset UI state

## Usage
1. create HTML file & add container element

    ``` HTML
    <html>
    <head>
        <!-- write script tag later -->
    </head>
    <body>
        <div id="container-id"></div> <!-- any id name -->
    </body>
    </html>
    ```

1. Read JavaScript file (write script tag)

    ``` HTML
    <script src="reversi-board.js"></script>
    ```

1. New/Update/Reset/Resize board

    ``` JavaScript
    // new ReversiBoard instance
    let reversiBoard = new ReversiBoard("container-id");

    // update board state
    let state = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 2, 3, 0, 0, 0],
        [0, 0, 0, 3, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    reversiBoard.update(state);

    // reset board
    reversiBoard.reset();

    // set resize event
    window.onresize = function() {
        reversiBoard.resize();
    }
    ```

## Methods
- ReversiBoard class
    | Name | Description | Argument |
    | --- | --- | --- |
    | constructor | - | board container id (String), [configurations](#ReversiBoard-class-configurations) (Object) |
    | update | update board state with array | 8x8 int Array |
    | reset | reset board state (no stones, only empty board) | no argument |
    | resize | resize board (board size follows container element width) | no argument |


## Customize
You can customize reversi UI when creating a ReversiBoard instance.

``` JavaScript
// configurations
let config = {
    styleStoneWhite: "Blue",
    styleStoneBlack: "Red",
}

// new ReversiBoard instance
let reversiBoard = new ReversiBoard("container-id", config);
```

### ReversiBoard class configurations
- State
    | Key | Description | Type | Default value |
    | --- | --- | --- | --- |
    | stateCellEmpty | empty cell state | Number | 0 |
    | stateCellAvailable | available cell state | Number | 1 |
    | stateStoneWhite | white stone state | Number | 2 |
    | stateStoneBlack | black stone state | Number | 3 |

- Style
    | Key | Description | Type | Default value |
    | --- | --- | --- | --- |
    | styleStoneWhite | white stone color | String | "white" |
    | styleStoneBlack | black stone color | String | "black" |
    | styleStoneWhiteBorderColor | white stone border color | String | "white" |
    | styleStoneBlackBorderColor | black stone border color | String | "black" |
    | styleCellEmpty | empty cell color | String | "green" |
    | styleCellAvailable | available cell color | String | "darkgreen" |
    | styleCellBorderColor | cell border color | String | "black" |
    | styleDotColor | Four dots color | String | "black" |

- id & classname
    | Key | Description | Type | Default value |
    | --- | --- | --- | --- |
    | idReversiBoard | board element id | String | "reversiboard" |
    | classNameLayer | board layer (board, dot, stone and mesh) class name | String | "reversiboard-layer" |
    | classNameRow | board row class name | String | "reversiboard-row" |
    | classNameCell | board cell class name | String | "reversiboard-cell" |
    | classNameStone | board stone class name | String | "reversiboard-stone" |
    | classNameDot | board dot class name | String | "reversiboard-dot" |
    | classNameMesh | board mesh class name | String | "reversiboard-mesh"

- Event function
    | Key | Description | Type | Default value |
    | --- | --- | --- | --- |
    | eventFunc | event function when a cell clicked. event function can receive values i, j and state. i, j is board coordinate, state is board state number.| function | function(i, j, state) { console.log("click (x=" + i + ", y=" + j + ")"); } |


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

## Demo
- Demo site https://mtsalt.github.io/reversi-ui
- Source code is `index.html` in this repository

## TODO
- Add other components
- Add animation
