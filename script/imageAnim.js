(() => {

	// // set up the puzzle pieces and boards
	const pieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	let piecesBoard = document.querySelector(".puzzle-pieces"),
		puzzleBoard = document.querySelector(".puzzle-board"),
		puzzleSelectors = document.querySelectorAll("#buttonHolder img");

	let dropZones = document.querySelectorAll('.drop-zone');

	function createPuzzlePieces(pictureIndex) {
		//generate puzzle pieces
		//debugger;
		pieces.forEach((piece, index) => {
			let newPuzzlePiece = `<img draggable id="piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg" alt="thumbnail">`
			
			piecesBoard.innerHTML += newPuzzlePiece;
		});

		puzzleBoard.style.backgroundImage = `url(images/background${pictureIndex}.jpg)`
		
		initDrag();
	}

	//handling drag n drop functionality
	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				console.log('draggin..........')

				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	//handle dragover n drop
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
			console.log('you dragged me over!');
		});

		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log('ouch! you dropped me!');

			let piece = e.dataTransfer.getData("text/plain");
			e.target.appendChild(document.querySelector(`#${piece}`));
		});
	});


	function resetPuzzlePieces() {
		// empty the container!!! dont fill it up too much :(
		piecesBoard.innerHTML = "";
		createPuzzlePieces(this.dataset.puzzleref);		
	}

	puzzleSelectors.forEach(puzzle => puzzle.addEventListener("click", resetPuzzlePieces));

	createPuzzlePieces(0);
	
})();
