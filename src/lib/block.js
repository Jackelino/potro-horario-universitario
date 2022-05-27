import { hours, days } from "./dateTimeConstants.js";

// Clase para un único bloque lógico dentro de la visualización del
// horario. Si más de un horario ocupa el bloque, entonces existe un
// empalme.
export class Block {
    constructor() {
        this.grids = [];
    }

    get style() {
        if (this.grids.length > 1) {
            return "traslape";
        } else if (this.grids.length == 1) {
            return this.grids[0].style;
        } else {
            return "empty-cell";
        }
    }

    get label() {
        if (this.grids.length > 1) {
            return "empalme";
        } else if (this.grids.length == 1) {
            return this.grids[0].label;
        } else {
            return "";
        }
    }

    get empty() {
        return this.grids.length === 0;
    }

    pushGrid(grid) {
        this.grids.push(grid);
    }
}

export const instanceGridView = () => {
    let gridView = new Object();
    for (let i = 0; i < hours.length; i++) {
        gridView[hours[i]] = new Object();
        for (let j = 0; j < days.length; j++) {
            gridView[hours[i]][days[j]] = new Block();
        }
    }
    return gridView;
};

// In: ("07:00, 9:00") => out: ["07:00", "07:30","08:00", "08:30"];
export const getBlocks = (start, end) => {
    if (!(hours.includes(start) && hours.includes(end))) {
        console.error("Invalid start or end");
    } else {
        let startIdx = hours.indexOf(start);
        let endIdx = hours.indexOf(end);
        let blocks = [];
        for (let i = startIdx; i < endIdx; i++) {
            blocks.push(hours[i]);
        }
        return blocks;
    }
};

