export class ScheduleView {
    constructor() {
        this.grids = [];
        this.idCtr = 0;
        // this.labels = ["👾", "🤖", "👽", "👟", "🍑", "💩", "🍆"];
        this.labels = ["🐙", "🐦", "👽", "👟", "🐶", "🏀", "🗿", "👾", "💭", "🤖"];
        this.colorPool = [
            "color-1", "color-2", "color-3", "color-4", "color-5", "color-6",
            "color-7", "color-8", "color-9", "color-10"
        ];
    }
    setGridStyle(idx, style) { this.grids[idx].style = style; }
    setGridLabel(idx, label) { this.grids[idx].label = label; }
    pushGrid(grid) {
        grid.id = this.idCtr;
        // Reverse pop
        grid.style = this.colorPool.shift();
        grid.label = this.labels.shift();
        this.grids.push(grid);
        this.idCtr++;
    }
    setGridId(idx, id) { this.grids[idx].id = id; }

    triggerIdUpdate() {
        // TODO: Que chingados hace esto
        let len = this.grids.length;
        this.idCtr += len;
        for (let i = 0; i < this.grids.length; i++) {
            this.grids[len - 1 - i].id += 1;
        }
    }
    removeGrid(grid) {
        let idx = this.grids.indexOf(grid);
        if (idx !== undefined) {
            this.labels.push(grid.label);
            this.colorPool.push(grid.style);
            this.grids.splice(idx, 1);
        }
    }
}
