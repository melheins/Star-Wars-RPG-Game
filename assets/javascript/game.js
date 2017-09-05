$(document).ready(function () {

    /* VARIABLES */

    // Creates variable to hold the number of wins
    var characterList =
        [{
            id: 0,
            char_name: "Obi-Wan Kenobi",
            char_hp: 120,
            char_ap: 8,
            char_cap: 6,
            image_loc: "assets/images/obi.png"
        }, {
            id: 1,
            char_name: "Luke Skywalker",
            char_hp: 100,
            char_ap: 7,
            char_cap: 5,
            image_loc: "assets/images/luke.png"
        }, {
            id: 2,
            char_name: "Darth Maul",
            char_hp: 180,
            char_ap: 27,
            char_cap: 25,
            image_loc: "assets/images/maul.png"
        }, {
            id: 3,
            char_name: "Darth Sidious",
            char_hp: 150,
            char_ap: 22,
            char_cap: 20,
            image_loc: "assets/images/sid.png"
        }];

    // Creates variable to hold the attacker's hit points
    var attackerHp;
    // Creates variable to hold the current defender's hit points
    var defenderHp;
    // Creates variable to hold the attacker's current attack power
    var attackerAp;

    /* FUNCTIONS */

    // Function to check if element is empty
    function isEmpty(el) {
        return !$.trim(el.html())
    }

    // Function to empty all the game populated sections
    function clearGameDivs() {
        $('#charSelcCont').empty();
        $('#arenaCont').empty();
        $('#defenderSelCont').empty();
    }

    // Function to hide a specific element or section
    function hideItem(tag) {
        $(tag).addClass('hidden');
    }

    // Function to un-hide a specific element or section
    function unhideItem(tag) {
        $(tag).removeClass('hidden');
    }

    // Function to create characters for Character Select
    function charCreation() {
        for (var i = 0; i < characterList.length; i++) {
            // Create an imageChar
            var charImage = $("<img>");

            // Add css class ".char-image" to image
            charImage.addClass("char-image img-rounded");

            // Each imageChar will be given a src link to the Character's image
            charImage.attr("src", characterList[i].image_loc);

            // Create a variable to hold html for character information
            var charText = '';

            //Add content to character's text variable
            charText = "<span>" + characterList[i].char_name +
                "<br> HP: <span class='char-hp'>" + characterList[i].char_hp +
                //"</span><br> AP: <span class='char-ap'>" + characterList[i].char_ap +
                // "</span><br> CAP: " + characterList[i].char_cap +
                "</p>";

            // Create sub divs for each character
            var charDivBox = $("<div>");
            var charDiv = $("<div>");
            // Add image and text to character's div box
            charDivBox.append(charImage, charText);
            // Add styling class to character div box
            charDivBox.addClass("character-details-box");
            // Add character div box to the outer bootstrap div charDiv
            charDiv.append(charDivBox);
            // Add bootstrap column class to character div
            charDiv.addClass("character-details col-xs-12 col-md-6 col-lg-3");
            // Add the character's id as a data value for future reference
            charDiv.attr("data-value", characterList[i].id);
            // Add character div to the character select div
            $("#charSelcCont").append(charDiv);
        }
    }

    // Function that resets the game back to the starting point
    function reset() {

        // Remove previous game data
        clearGameDivs();

        // Create Characters for Character Select
        charCreation();
    }

    //INITIALIZE GAME ON FIRST LOAD
    reset();


    /* ON CLICK EVENTS */

    // On Character Select Click
    $("div#charSelcCont").on("click", ".character-details", function () {
        // Grap the specific image click's value
        var attackId = ($(this).attr("data-value"));

        // Change styling on attackers box
        $(this).addClass("arena-attacker");
        $(this).addClass("col-lg-6");
        $(this).removeClass("col-lg-3");

        //Move Selected Character to Arena
        $(this).prependTo($('#arenaCont'));

        //Set Attacker's HP & AP
        attackerHp = characterList[attackId].char_hp;
        attackerAp = characterList[attackId].char_ap;

        // Move not selected characters to defender selection
        $('#charSelcCont>div').appendTo($('#defenderSelCont'));

        // Hide Character selection area, un-hide arena & defender selection area
        hideItem('#charSelc');
        unhideItem('#arena');
        unhideItem('#defenders');
    });

    // On Defender Select Click
    $("div#defenderSelCont").on("click", ".character-details", function () {

        // Grab the specific image click's value
        var defenderId = ($(this).attr("data-value"));

        // Change styling on defenders box
        $(this).addClass("arena-defender");
        $(this).addClass("col-lg-6");
        $(this).removeClass("col-lg-3");

        //Move Selected Character to Arena
        $(this).appendTo($('#arenaCont'));

        //Set Defender's HP
        defenderHp = characterList[defenderId].char_hp;

        // Hide defender selection area and un-hide attack button
        unhideItem('.btn-attack');
        hideItem('#defenders');
    });

    // On Attack Button Click
    $(".btn-attack").click(function () {

        // Grab the attacker and defender's id's
        var attackId = ($('.arena-attacker').attr("data-value"));
        var defenderId = ($('.arena-defender').attr("data-value"));

        //Update Defender's HP (Minus Attacker's AP)
        defenderHp = defenderHp - attackerAp;
        document.querySelector('.arena-defender .char-hp').innerHTML = defenderHp;

        //If Defender still alive, update attacker's stats and check if attacker survives
        if (defenderHp > 0) {
            //Update Attacker's HP (Minus Defender's CAP)
            attackerHp = attackerHp - characterList[defenderId].char_cap;
            document.querySelector('.arena-attacker .char-hp').innerHTML = attackerHp;

            //Increase Attacker's Power
            attackerAp = attackerAp + characterList[attackId].char_ap;
            //document.querySelector('.arena-attacker .char-ap').innerHTML = attackerAp;

            // If attacker is dead, user loses. Un-hide game over section and hide arena and attack button
            if (attackerHp < 1) {
                unhideItem('#gameover');
                hideItem('#arena');
                hideItem('.btn-attack');
            }
        }
        // If Defender is dead, remove them from arena, check if more defenders and check if won game
        else {
            // Remove defender from arena
            $('.arena-defender').remove();

            //Check for other defenders
            if (isEmpty($('#defenderSelCont'))) {
                // If no defenders left, user wins. Un-hide congrats section, hide arena and attack button
                unhideItem('#congrats');
                hideItem('#arena');
                hideItem('.btn-attack');
            }
            else {
                // If there are still defenders left, un-hide defender selection section and hide attack button
                hideItem('.btn-attack');
                unhideItem('#defenders');
            }
        }
    });

    // On Restart Game Button Click
    $(".btn-restartGame").click(function () {
        hideItem('#congrats');
        hideItem('#gameover');
        unhideItem('#charSelc');
        reset();
    });
});

