export class Grid{
	rows = 30;
	cols = 8;
	//
	elems = [];
	//
	/**
	 * @param {Number} rows
	 * @param {Number} cols
	 */
	constructor(rows, cols){
		this.rows = rows ? rows : 30;
		this.cols = cols ? cols : 8;
		this.createGrid();
	}
	/**
	 * creates {2d array} grid
	 * @memberof Grid
	 */
	createGrid(){
		for(let i=0; i<this.rows; i++){
			this.elems[i] = [];
			for(let j=0; j<this.cols; j++){
				this.elems[i][j] = null;
			}
		}
	}
	/**
	 * insert axies into grid
	 * @param {*} axieSpines
	 * @memberof Grid
	 */
	insertElems(axieSpines){
		var i = 0;
		var c = 0;
		axieSpines.forEach((axieSpine) => {
			this.elems[i][c] = axieSpine;
			c++;
			if(c >= this.cols) {
				i++;
				c = 0;
			}
		});
	}
	/**
	 * @param {id} Number
	 */
	/*getElemById(id){
		for(let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.cols; j++){
				if(this.grid[i][j])
			}
		}
	}*/
}