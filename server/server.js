let allPlayersRef;

let s;
function renderPlayersList(snapshot){
    allPlayersRef.get().then((snapshot) => {
        let players = [];
        Object.values(snapshot.val() || {}).forEach(entry => {
            players.push(entry.name);
        });
        const counts = {};
        players.forEach(function (x) {counts[x] = (counts[x] || 0) + 1});
        $("#lista-giocatori").empty();
        Object.entries(counts).forEach(entry => {
            const [key, value] = entry;
            $("#lista-giocatori").append(`<p class="new-player">${key} (${value})<p/>`);
        });
        s = snapshot;
        }).catch((error) => {
            console.error(error);
        });
}

function init(){
    allPlayersRef = firebase.database().ref(`players`);
    allPlayersRef.on("value", (snapshot) => {
        console.log("click!");
    })
    allPlayersRef.on("child_added", (snapshot) => {
        renderPlayersList();
    })
    allPlayersRef.on("child_removed", (snapshot) => {
        renderPlayersList();
    })
}

$(function () {
    firebase.auth().onAuthStateChanged((user) => {
        init();
    })

    firebase.auth().signInAnonymously().catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
    
});

function daSchermataInizialeAGioco(){

}

