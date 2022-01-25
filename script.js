const Player = (sign, name) => {
    const player_sign = sign;
    const player_name = name;
    return { player_sign, player_name };
}

const display_controller = (() => {
    let board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""],]
                 
    const cells = document.getElementsByClassName("cell");
    const human1 = Player("X", localStorage.getItem("player1_name"));
    const human2 = Player("O", localStorage.getItem("player2_name"));
    const heading = document.getElementById("player-turn-heading");
    const overlay = document.getElementById("overlay");
    const overlay_content = document.getElementById("overlay-content");
    let game_status = true;

    let current_player = human1;

    const init = () => {
        display_board();
        listen_to_click();
        change_heading();
    }

    const display_board = () => {
        for (let row = 0; row < board.length; row++){
            for (let col = 0; col < board.length; col++){
                cells[row * 3 + col].textContent = board[row][col]
            }
        }
    }
    const listen_to_click = () => {
        reset_btn = document.getElementById("reset-btn");
        reset_btn.addEventListener("click", reset)
        Array.from(cells).forEach((cell) => {
            cell.addEventListener("click",handle_click);
            
        });
    }
    const handle_click = (e) => {
        index = e.target.getAttribute("data-index")
        if (!board[Math.floor(index / 3)][index % 3] && game_status) {
            board[Math.floor(index / 3)][index % 3] = current_player.player_sign;
            display_board();
            handle_win_draw();
            change_turn();
            change_heading();
        }
    }

    const change_turn = () => {
        current_player = current_player === human1 ? human2 : human1;
    }

    const handle_win_draw = () => {
        if (game_controller.check_win(board, current_player)) {
            overlay.classList.add("active");
            overlay_content.textContent = current_player.player_name + " won!";
            game_status = false;
        }
        else if (game_controller.check_draw(board)) {
            overlay.classList.add("active");
            overlay_content.textContent = "It's a Draw :(";
            game_status = false;
        }
        overlay.addEventListener("click", close_overlay);
    }

    const reset = () => {
        board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""],];
        current_player = human1;
        change_heading();
        display_board();
        game_status = true;
    }
    const change_heading = () => {
        heading.textContent = (current_player === human1 ? current_player.player_name : current_player.player_name) + "'s turn";
    }
    const close_overlay = () => {
        overlay.classList.remove("active");
    }
    return { init, board };
})()

const game_controller = (() => {
    const check_win = (board, player) => {
        const rows = check_for_rows(board, player);
        const cols = check_for_cols(board, player);
        const diagonals = check_for_diagonals(board, player);
        return rows || cols || diagonals;
    }
    const check_for_rows = (board, player) => {
        const is_same = (cell) => cell === player.player_sign;
        for (let i = 0; i < board.length; i++){
            if (board[i].every(is_same)) {
                return true;
            }
        }
    }
    const check_for_cols = (board, player) => {
        const is_same = (cell) => cell === player.player_sign;
        const get_column = (arr, col_num) => arr.map(row => row[col_num]);
        for (let i = 0; i < board.length; i++){
            if (get_column(board, i).every(is_same)) {
                return true;
            }
        }
    } 
    const check_for_diagonals = (board, player) => {
        return check_negative_diagonals(board, player) || check_positive_diagonals(board, player);
    }
    const check_negative_diagonals = (board, player) => {
        for (let i = 0; i < board.length; i++){
            if (board[i][i] != player.player_sign) {
                return false;
            }
        }
        return true;
    }
    const check_positive_diagonals = (board, player) => {
        let x_offset = 2
        for (let i = 0; i < board.length; i++){
            if (board[i][x_offset] != player.player_sign) {
                return false;
            }
            x_offset--;
        }
        return true;
    }
    const check_draw = (board) => {
        for (let i = 0; i < board.length; i++){
            if (board[i].some((cell) => cell === "")) {
                return false;
            }
        }
        return true;
    }
    return { check_win, check_draw };
})()
display_controller.init()