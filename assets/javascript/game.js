$(document).ready(function () {

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

    // Function to check if element is empty
    function isEmpty(el) {
        return !$.trim(el.html())
    }


    // Function that resets the game back to the starting point
    function reset() {
        // Create Characters for Character Select
        for (var i = 0; i < characterList.length; i++) {
            // Create an imageChar
            var charImage = $("<img>");

            // Add css class ".char-image" to image
            charImage.addClass("char-image");

            // Each imageChar will be given a src link to the Character's image
            charImage.attr("src", characterList[i].image_loc);

            // Create a variable to hold html for character information
            var charText = '';

            //Add content to character's text variable
            charText = "<span>" + characterList[i].char_name +
                "<br> HP: <span class='char-hp'>" + characterList[i].char_hp +
                "</span><br> AP: <span class='char-ap'>" + characterList[i].char_ap +
                "</span><br> CAP: " + characterList[i].char_cap + "</p>";

            // Create sub div for each character
            var charDiv = $("<div>");
            // Add image and text to character's div
            charDiv.append(charImage, charText);
            // Add bootstrap column class to character div
            charDiv.addClass("character-details col-xs-12 col-md-6 col-lg-3");
            charDiv.attr("data-value", characterList[i].id);

            // Add character div to the character select div
            $("#charSelcCont").append(charDiv);
        }
    }

    //INITIALIZE GAME ON FIRST LOAD
    reset();


    // On Character Select Click
    $("div#charSelcCont").on("click", ".character-details", function () {
        // Grap the specific image click's value
        var attackId = ($(this).attr("data-value"));

        $(this).addClass("arena-attacker");
        $(this).addClass("col-lg-6");
        $(this).removeClass("col-lg-3");

        //Move Selected Character to Arena
        $(this).prependTo($('#arenaCont'));

        //Set Attacker HP
        attackerHp = characterList[attackId].char_hp;
        attackerAp = characterList[attackId].char_ap;

        // Move not selected characters to defender selection
        $('#charSelcCont>div').appendTo($('#defenderSelCont'));

        // Hide Character selection area
        $('#charSelc').addClass('hidden');
        $('#arena').removeClass('hidden');
        $('#defenders').removeClass('hidden');
    });

    // On Defender Select Click
    $("div#defenderSelCont").on("click", ".character-details", function () {

        // Grap the specific image click's value
        var defenderId = ($(this).attr("data-value"));
        $(this).addClass("arena-defender");
        $(this).addClass("col-lg-6");
        $(this).removeClass("col-lg-3");

        //Move Selected Character to Arena
        $(this).appendTo($('#arenaCont'));

        //Set Attacker HP
        defenderHp = characterList[defenderId].char_hp;

        // Hide Character selection area
        $('.btn-attack').removeClass('hidden');
        $('#defenders').addClass('hidden');
    });

    // Attack Btn
    $(".btn-attack").click(function () {

        // Grap the specific image click's value
        var attackId = ($('.arena-attacker').attr("data-value"));
        var defenderId = ($('.arena-defender').attr("data-value"));
        //console.log("A ID: " + attackId);
        //console.log("D ID: " + defenderId);

        console.log("A: " + characterList[attackId].char_name);
        console.log("D: " + characterList[defenderId].char_name);
        //Update Defender's HP (Minus Attacker's AP)
        //console.log("D Before " + characterList[defenderId].char_hp);
        defenderHp = defenderHp - attackerAp;

        document.querySelector('.arena-defender .char-hp').innerHTML = defenderHp;
        //console.log("D After " + characterList[defenderId].char_hp);

        if (defenderHp > 0) {
            //Update Attacker's HP (Minus Defender's CAP)
            //console.log("A Before " + characterList[attackId].char_hp);
            attackerHp = attackerHp - characterList[defenderId].char_cap;

            document.querySelector('.arena-attacker .char-hp').innerHTML = attackerHp;


            //console.log("A After " + characterList[attackId].char_hp);

            //Increase Attacker's Power
            // console.log("A Before " + characterList[attackId].char_ap);
            attackerAp = attackerAp + characterList[attackId].char_ap;
            document.querySelector('.arena-attacker .char-ap').innerHTML = attackerAp;
            // console.log("A After " + characterList[attackId].char_ap);

            if (attackerHp < 1) {
                // YOU LOOSE
                console.log("YOU LOOSE!");
                $('#gameover').removeClass('hidden');
                $('#arena').addClass('hidden');
            }
        }
        else {
            $('.arena-defender').remove();
            console.log(characterList);

            //Check for other defenders
            if (isEmpty($('#defenderSelCont'))) {
                console.log("YOU WIN!");
                $('#congrats').removeClass('hidden');
                $('#arena').addClass('hidden');
                $('.btn-attack').addClass('hidden');
                $('.arena-attacker').remove();
            }
            else {
                $('.btn-attack').addClass('hidden');
                $('#defenders').removeClass('hidden');

            }
        }


    });

    $(".btn-restartGame").click(function () {
        $('#charSelc').removeClass('hidden');
        $('#gameover').addClass('hidden');
        $('#congrats').addClass('hidden');
        reset();
    });


});

