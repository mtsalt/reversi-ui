class ReversiBoard {

    #settings = null;
    #boardContainer = null;
    #boardStyle = null;
    #boardAdjuster = null;
    #currentState = null;

    constructor(boardContainerId, settings={}) {
        this.#settings = this.#initSettings(settings);
        this.#currentState = this.#settings.stateBoardEmpty;
        this.#initDOM(boardContainerId);
        this.#initStyle();
        this.#initAdjuster();
        this.#initClickEvent();
    }

    /**
     * update board state
     * @param {Array} nextState - 8x8 board array of state variables
     */
    update(nextState) {
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                let state = nextState[i][j];
                let stoneElem = document.getElementById(ReversiBoardDOM.createId(this.#settings.classNameStone, i, j));
                let cellElem = document.getElementById(ReversiBoardDOM.createId(this.#settings.classNameCell, i, j));
                switch (state) {
                    case this.#settings.stateStoneWhite:
                        this.#boardStyle.setStoneStyle(stoneElem, this.#settings.styleStoneWhite, this.#settings.styleStoneWhiteBorderColor);
                        this.#boardStyle.setCellStyle(cellElem, this.#settings.styleCellBorderColor, this.#settings.styleCellEmpty);
                        break;
                    case this.#settings.stateStoneBlack:
                        this.#boardStyle.setStoneStyle(stoneElem, this.#settings.styleStoneBlack, this.#settings.styleStoneBlackBorderColor);
                        this.#boardStyle.setCellStyle(cellElem, this.#settings.styleCellBorderColor, this.#settings.styleCellEmpty);
                        break;
                    case this.#settings.stateCellEmpty:
                        this.#boardStyle.setStoneStyle(stoneElem, this.#settings.styleTransparent, this.#settings.styleTransparent);
                        this.#boardStyle.setCellStyle(cellElem, this.#settings.styleCellBorderColor, this.#settings.styleCellEmpty);
                        break;
                    case this.#settings.stateCellAvailable:
                        this.#boardStyle.setStoneStyle(stoneElem, this.#settings.styleTransparent, this.#settings.styleTransparent);
                        this.#boardStyle.setCellStyle(cellElem, this.#settings.styleCellBorderColor, this.#settings.styleCellAvailable);
                        break;
                }
            }
        }
    }

    /**
     * reset board state
     *  (empty the reversi board)
     */
    reset() {
        let cellElems = document.getElementsByClassName(this.#settings.classNameCell);
        for (let i=0; i<cellElems.length; i++) {
            let e = cellElems[i];
            this.#boardStyle.setCellStyle(e, this.#settings.styleCellBorderColor, this.#settings.styleCellEmpty);
        }
        
        let stoneElems = document.getElementsByClassName(this.#settings.classNameStone);
        for (let i=0; i<stoneElems.length; i++) {
            let e = stoneElems[i];
            this.#boardStyle.setStoneStyle(e, this.#settings.styleTransparent, this.#settings.styleTransparent);
        }
    }

    /**
     * resize reversi board 
     *  (when the browser window is resized, 
     *    this method adjusts the size of the reversi board.)
     */
    resize() {
        let containerWidth = this.#boardContainer.clientWidth;
        let result = this.#boardAdjuster.calculate(containerWidth);

        let b = result.board;
        this.#boardStyle.resizeBoard(b.sideLength, b.borderWidth, b.borderRadius);

        let c = result.cell;
        this.#boardStyle.resizeAllCell(c.sideLength, c.borderWidth);

        let d = result.dot;
        this.#boardStyle.resizeAllDot(d.sideLength, d.margin);

        let m = result.mesh;
        this.#boardStyle.resizeAllMesh(m.sideLength);

        let s = result.stone;
        this.#boardStyle.resizeAllStone(s.sideLength, s.margin);
    }

    #initDOM(boardContainerId) {
        let o = new ReversiBoardDOM(this.#settings);
        let reversiDOM = o.create();
        this.#boardContainer = document.getElementById(boardContainerId);
        this.#boardContainer.appendChild(reversiDOM);
    }

    #initStyle() {
        this.#boardStyle = new ReversiBoardStyle(this.#settings);
        let cellElems = document.getElementsByClassName(this.#settings.classNameCell);
        for (let i=0; i<cellElems.length; i++) {
            let e = cellElems[i];
            this.#boardStyle.setCellStyle(e, this.#settings.styleCellBorderColor, this.#settings.styleCellEmpty);
        }
        this.#boardStyle.setAllDotStyle(this.#settings.styleDotColor);
        this.#boardStyle.setAllLayerStyle();
        let stoneElems = document.getElementsByClassName(this.#settings.classNameStone);
        for (let i=0; i<stoneElems.length; i++) {
            let e = stoneElems[i];
            this.#boardStyle.setStoneStyle(e, this.#settings.styleTransparent);
        }
        this.#boardStyle.setAllRowStyle();
    }

    #initAdjuster() {
        this.#boardAdjuster = new ReversiBoardAdjuster(this.#settings);
    }

    #initSettings(settings) {
        return {
            // state
            stateCellEmpty: settings.stateCellEmpty || 0,
            stateCellAvailable: settings.stateCellAvailable || 1,
            stateStoneWhite: settings.styleStoneWhite || 2,
            stateStoneBlack: settings.styleStoneBlack || 3,
            stateBoardEmpty: settings.stateBoardEmpty || this.#generateEmptyBoard(
                settings.stateCellEmpty || 0),
            
            // style
            styleTransparent: "transparent",
            styleStoneWhite: settings.styleStoneWhite || "white",
            styleStoneBlack: settings.styleStoneBlack || "black",
            styleStoneWhiteBorderColor: settings.styleStoneWhiteBorderColor || "white",
            styleStoneBlackBorderColor: settings.styleStoneBlackBorderColor || "black",
            styleCellEmpty: settings.styleCellEmpty || "green",
            styleCellAvailable: settings.styleCellAvailable || "greenyellow",
            styleCellBorderColor: settings.styleCellBorderColor || "black",
            styleDotColor: settings.styleDotColor || "black",
            styleBoardColor: settings.styleBoardColor || "black",
            styleBoardBorderColor: settings.styleBoardBorderColor || "black",
            
            // id and class name
            idReversiBoard: settings.idReversiBoard || "reversiboard",
            classNameLayer: settings.classNameLayer || "reversiboard-layer",
            classNameRow: settings.classNameRow || "reversiboard-row",
            classNameCell: settings.classNameCell || "reversiboard-cell",
            classNameStone: settings.classNameStone || "reversiboard-stone",
            classNameDot: settings.classNameDot || "reversiboard-dot",
            classNameMesh: settings.classNameMesh || "reversiboard-mesh",

            // event function
            eventFunc: settings.eventFunc || function(i, j, state) {
                console.log("click (x=" + i + ", y=" + j + ")");
            }
        };
    }

    #initClickEvent() {
        this.eventFunc = this.#settings.eventFunc;
        let meshElems = document.getElementsByClassName(this.#settings.classNameMesh);
        for (let i=0; i<meshElems.length; i++) {
            let elem = meshElems[i];
            elem.addEventListener("click", (e) => {
                let position = ReversiBoardDOM.extractIndexNumber(e.target.id);
                let state = this.#currentState[position.x][position.y];
                this.eventFunc(position.x, position.y, state);
            });
        }
    }

    #generateEmptyBoard(empty) {
        let emptyBoard = [];
        for (let i=0; i<8; i++) {
            let row = [];
            for (let j=0; j<8; j++) {
                row.push(empty);
            }
            emptyBoard.push(row);
        }
        return emptyBoard;
    }

}

class ReversiBoardDOM {

    constructor(settings) {
        this.settings = settings;
    }

    create() {

        // reversi board container
        let reversiBoard = document.createElement("div");
        reversiBoard.id = this.settings.idReversiBoard;

        // add board layer
        let boardLayer = this.#createBoardLayer();
        reversiBoard.appendChild(boardLayer);

        // add dot layer
        let dotLayer = this.#createDotLayer();
        reversiBoard.appendChild(dotLayer);

        // add stone layer
        let stoneLayer = this.#createStoneLayer();
        reversiBoard.appendChild(stoneLayer);

        // add mesh layer
        let meshLayer = this.#createMeshLayer();
        reversiBoard.appendChild(meshLayer);

        return reversiBoard;
    }

    #createBoardLayer() {

        let boardLayer = document.createElement("div");
        boardLayer.className = this.settings.classNameLayer;

        for (let i = 0; i < 8; i++) {
            let row = document.createElement("div");
            row.className = this.settings.classNameRow;
            for (let j = 0; j < 8; j++) {
                let cell = document.createElement("div");
                cell.className = this.settings.classNameCell;
                cell.id = ReversiBoardDOM.createId(this.settings.classNameCell, i, j);
                row.appendChild(cell);
            }
            boardLayer.appendChild(row);
        }

        return boardLayer;
    }

    #createDotLayer() {

        let dotLayer = document.createElement("div");
        dotLayer.className = this.settings.classNameLayer;

        for (let i = 0; i < 2; i++) {
            let row = document.createElement("div");
            row.className = this.settings.classNameRow;
            for (let j = 0; j < 2; j++) {
                let dot = document.createElement("div");
                dot.className = this.settings.classNameDot;
                row.appendChild(dot);
            }
            dotLayer.appendChild(row);
        }

        return dotLayer;
    }

    #createStoneLayer() {

        let stoneLayer = document.createElement("div");
        stoneLayer.className = this.settings.classNameLayer;

        for (let i = 0; i < 8; i++) {
            let row = document.createElement("div");
            row.className = this.settings.classNameRow;
            for (let j = 0; j < 8; j++) {
                let stone = document.createElement("div");
                stone.className = this.settings.classNameStone;
                stone.id = ReversiBoardDOM.createId(this.settings.classNameStone, i, j);
                row.appendChild(stone);
            }
            stoneLayer.appendChild(row);
        }

        return stoneLayer;
    }

    #createMeshLayer() {

        let meshLayer = document.createElement("div");
        meshLayer.className = this.settings.classNameLayer;

        for (let i = 0; i < 8; i++) {
            let row = document.createElement("div");
            row.className = this.settings.classNameRow;
            for (let j = 0; j < 8; j++) {
                let mesh = document.createElement("div");
                mesh.className = this.settings.classNameMesh;
                mesh.id = ReversiBoardDOM.createId(this.settings.classNameMesh, i, j);
                row.appendChild(mesh);
            }
            meshLayer.appendChild(row);
        }

        return meshLayer;
    }

    /**
     * create html ID
     *   (format: "[prefix]-[number]_[number]")
     * @param {string} prefix prefix for ID
     * @param {number} i row number
     * @param {number} j colum number
     * @returns ID string
     */
    static createId(prefix, x, y) {
        return prefix + "-" + String(x) + "_" + String(y);
    }

    /**
     * extract index number (x and y) from id name 
     *   (id is generated by createId, like "prefix-1_2")
     * @param {string} id 
     * @returns index number (x and y)
     */
    static extractIndexNumber(id) {
        let splitId = id.split("-");
        let xy = splitId[splitId.length-1].split("_");
        return {
            x: parseInt(xy[0]),
            y: parseInt(xy[1])
        };
    }
}


class ReversiBoardAdjuster {

    constructor(settings) {
        this.settings = settings;
    }

    calculate(containerWidth) {
        return {
            board: this.calculateBoard(containerWidth),
            cell: this.calculateCell(containerWidth),
            dot: this.calculateDot(containerWidth),
            stone: this.calculateStone(containerWidth),
            mesh: this.calculateMesh(containerWidth)
        };
    }

    calculateBoard(containerWidth) {
        return {
            sideLength: String(containerWidth) + "px",
            padding: "10px",
            borderWidth: "2px",
        };
    }

    calculateCell(containerWidth) {
        let cellSideLength = containerWidth / 8;
        return {
            sideLength: String(cellSideLength - 2) + "px",
            // borderWidth: String(cellSideLength / 10000) + "px",
            borderWidth: "1px"
        };
    }

    calculateDot(containerWidth) {
        let dotDiameter = containerWidth / 30;
        let margin = (containerWidth / 2 - dotDiameter) / 2;
        return {
            sideLength: String(dotDiameter) + "px",
            margin: String(margin) + "px"
        };
    }

    calculateStone(containerWidth) {
        let cellSideLength = containerWidth / 8;
        let stoneDiamiter = cellSideLength * 0.90;
        let margin = (cellSideLength - stoneDiamiter) / 2;
        return {
            sideLength: String(stoneDiamiter) + "px",
            margin: String(margin) + "px",
        };
    }

    calculateMesh(containerWidth) {
        let sideLength = containerWidth / 8;
        return {
            sideLength: String(sideLength) + "px"
        };
    }

}


class ReversiBoardStyle {

    constructor(settings) {
        this.setting = settings;
    }

    resizeBoard(sideLength) {
        let elem = document.getElementById(this.setting.idReversiBoard);
        elem.style.width = sideLength;
        elem.style.height = sideLength;
    }

    setCellStyle(element, borderColor, backgroundColor) {
        element.style.borderColor = borderColor;
        element.style.borderStyle = "solid";
        element.style.backgroundColor = backgroundColor;
    }

    resizeAllCell(sideLength, borderWidth) {
        let elems = document.getElementsByClassName(this.setting.classNameCell);
        for (let i=0; i<elems.length; i++) {
            let e = elems[i];
            e.style.width = sideLength;
            e.style.height = sideLength;
            e.style.borderWidth = borderWidth;
        }
    }

    setAllDotStyle(backgroundColor) {
        let elems = document.getElementsByClassName(this.setting.classNameDot);
        for (let i=0; i<elems.length; i++) {
            let e = elems[i];
            e.style.backgroundColor = backgroundColor;
        }
    }

    resizeAllDot(sideLength, margin) {
        let elems = document.getElementsByClassName(this.setting.classNameDot);
        for (let i=0; i<elems.length; i++) {
            let e = elems[i];
            e.style.width = sideLength;
            e.style.height = sideLength;
            e.style.margin = margin;
            e.style.borderRadius = "50%";
        }
    }

    setStoneStyle(element, backgroundColor, borderColor) {
        element.style.backgroundColor = backgroundColor;
        element.style.borderColor = borderColor;
    }

    resizeAllStone(sideLength, margin) {
        let elems = document.getElementsByClassName(this.setting.classNameStone);
        for (let i=0; i<elems.length; i++) {
            let e = elems[i];
            e.style.width = sideLength;
            e.style.height = sideLength;
            e.style.margin = margin;
            e.style.borderRadius = "50%";
        }
    }

    resizeAllMesh(sideLength) {
        let elems = document.getElementsByClassName(this.setting.classNameMesh);
        for (let i=0; i<elems.length; i++) {
            let e = elems[i];
            e.style.width = sideLength;
            e.style.height = sideLength;
        }
    }

    setAllRowStyle() {
        let elems = document.getElementsByClassName(this.setting.classNameRow);
        for (let i=0; i<elems.length; i++) {
            let e = elems[i];
            e.style.display = "flex";
        }
    }

    setAllLayerStyle() {
        let elems = document.getElementsByClassName(this.setting.classNameLayer);
        for (let i=0; i<elems.length; i++) {
            let e = elems[i];
            e.style.position = "absolute";
        }
    }

}
