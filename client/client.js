let playerRef;

function init(){
    const playerNameInput = document.querySelector("#player-name");

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            //You're logged in!
            const playerId = user.uid;
            playerRef = firebase.database().ref(`players/${playerId}`);

            playerRef.set({
                name: playerNameInput.value,
                clicked: false
            });

            playerRef.onDisconnect().remove();

            //Begin the game now that we are signed in
        } else {
            //You're logged out.
        }
    })

    firebase.auth().signInAnonymously().catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
    });

    $("#big-button").show();
    $("#login").hide();
}

$(function() {
    console.log( "ready!" );
    $("#big-button").hide();
    
    const buttonOk = document.querySelector("#button-ok");

    buttonOk.addEventListener("click", init);
});

function big_click(){
    console.log("clicked");
    playerRef.update({
        clicked: true
    })
}