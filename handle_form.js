function get_form_values() {
    localStorage.setItem("player1_name", player1_name.value ? player1_name.value : "Player 1");
    localStorage.setItem("player2_name", player2_name.value ? player2_name.value : "Player 2");    
}
const player1_name = document.getElementById("player-1");
const player2_name = document.getElementById("player-2");
const submit_btn = document.getElementById("submit-btn");
submit_btn.addEventListener("click", get_form_values)