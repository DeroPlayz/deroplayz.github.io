/* smash.js */
document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    const choose_attacker = document.getElementById("choose_attacker");
    const resetter = document.getElementById("reset");

=======
>>>>>>> parent of 9ab01c8 (twiddled my thumbs in javascript!)
    const customMenu = document.getElementById("custom-menu");
    const menuTitle = document.getElementById("menu-title");
    const slot = document.getElementById("slot"); // Our <select> dropdown
    const home_stage = document.getElementById("home_stage");
    
    const index_number = document.getElementById("index_number");
    const above = document.getElementById("above");
    const below = document.getElementById("below");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const upper_left = document.getElementById("upper_left");
    const lower_left = document.getElementById("lower_left");
    const upper_right = document.getElementById("upper_right");
    const lower_right = document.getElementById("lower_right");

    let activeImage = null;    
    
    const fighters = document.querySelectorAll("img.fighter");
    const fighters_index = new Map();
    const home_stage_map = new Map();
    loadMaps();

    function roll_attacker(){
        choose_attacker.innerText = "Attacker: " + fighters[parseInt(Math.random()*2)].alt + "\nPress again to reroll.";
    }
    choose_attacker.addEventListener("click", roll_attacker);

    function resetslots(){
        // 1. Clear all LocalStorage data
        localStorage.clear();

        // 2. Loop through every fighter and reset their image to the default
        document.querySelectorAll(".fighter").forEach(img => {
            // Since we are using data-src to store the original path:
            img.src = img.getAttribute("data-src");
        });

        // 3. Optional: Alert the user
        console.log("All saved data has been erased and images reset.");
    }
    resetter.addEventListener("click", resetslots);
    
    // 1. INITIALIZE: Check owners on page load
    function initializeImages() {
        document.querySelectorAll(".fighter").forEach(img => {
            const savedOwner = localStorage.getItem("notes_" + img.alt);
            if (savedOwner && savedOwner.trim() !== "") {
                img.src = "img/smash/render/" + savedOwner + ".png";
                img.alt = savedOwner;
            } else {
                // If no owner is saved, use the default data-src
                img.src = img.getAttribute("data-src");
            }
        });
    }

    initializeImages();

    // 2. OPEN MENU: Set dropdown to character's name by default
    function openMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        activeImage = e.currentTarget;

        /* 
         * Get Fighter Upper Left = -14
         * Get Fighter Above = -13
         * Get Fighter Upper Right = -12
         * Get Fighter Left = -1
         * Get Fighter Right = +1
         * Get Fighter Lower Left = +12
         * Get Fighter Below = +13
         * Get Fighter Lower Right = +14
         * If there is no fighter at given index, try again.
         */
        const val = parseInt(fighters_index.get(activeImage.alt));
        let vert_mod = 13;
        if(val > 78){vert_mod = 11}
        index_number.innerText = "Index #: " + val;

        if(val - vert_mod -1 > -1 && val - vert_mod -1 < 88){above.innerText = "Above: " + fighters[(val - vert_mod) - 1].alt;}
        else{above.innerText = "Above: undefined";}

        if(val + vert_mod -1 > -1 && val + vert_mod -1 < 88){below.innerText = "Below: " + fighters[(val + vert_mod) - 1 ].alt;}
        else{below.innerText = "Below: undefined";}

        if(val - 1 -1 > -1 && val - 1 -1 < 88){left.innerText = "Left: " + fighters[(val - 1) - 1].alt;}
        else{left.innerText = "Left: undefined";}

        if(val - vert_mod - 1 -1 > -1 && val - vert_mod - 1 -1 < 88){upper_left.innerText = "Upper Left: " + fighters[(val - vert_mod - 1) - 1].alt;}
        else{upper_left.innerText = "Upper Left: undefined";}
        
        if(val + vert_mod - 1 -1 > -1 && val + vert_mod - 1 -1 < 88){lower_left.innerText = "Lower Left: " + fighters[(val + vert_mod - 1) - 1].alt;}
        else{lower_left.innerText = "Lower Left: undefined";}
        
        if(val + 1 -1 > -1 && val + 1 -1 < 88){right.innerText = "Right: " + fighters[(val + 1) - 1].alt;}
        else{right.innerText = "Right: undefined";}
        
        if(val - vert_mod + 1 -1 > -1 && val - vert_mod + 1 -1 < 88){upper_right.innerText = "Upper Right: " + fighters[(val - vert_mod + 1) - 1].alt;}
        else{upper_right.innerText = "Upper Right: undefined";}
        if(val + vert_mod + 1 -1 > -1 && val + vert_mod + 1 -1 < 88){lower_right.innerText = "Lower Right: " + fighters[(val + vert_mod + 1) - 1].alt;}
        else{lower_right.innerText = "Lower Right: undefined";}
        
        if(val % 13 == 0){right.innerText = "Right: undefined"; upper_right.innerText = "Upper Right: undefined"; lower_right.innerText = "Lower Right: undefined"}
        if((val - 1) % 13 == 0){left.innerText = "Left: undefined"; upper_left.innerText = "Upper Left: undefined"; lower_left.innerText = "Lower Left: undefined"}
        above.innerText = above.innerText.replace("undefined", "None");
        below.innerText = below.innerText.replace("undefined", "None");
        left.innerText = left.innerText.replace("undefined", "None");
        upper_left.innerText = upper_left.innerText.replace("undefined", "None");
        lower_left.innerText = lower_left.innerText.replace("undefined", "None");
        right.innerText = right.innerText.replace("undefined", "None");
        upper_right.innerText = upper_right.innerText.replace("undefined", "None");
        lower_right.innerText = lower_right.innerText.replace("undefined", "None");

        // Load saved data for this specific character
        const savedData = localStorage.getItem("notes_" + activeImage.alt);

        if (savedData) {
            // If we have a saved owner, select it in the dropdown
            slot.value = savedData;
            home_stage.innerText = "Home Stage: " + home_stage_map.get(slot.value)
        } else {
            // IF NOTHING IS SAVED: Default the dropdown to the clicked character's name
            slot.value = activeImage.alt;
            home_stage.innerText = "Home Stage: " + home_stage_map.get(slot.value)
        }
        
        // Position and show the menu
        customMenu.style.top = `${e.pageY}px`;
        customMenu.style.left = `${e.pageX}px`;
        customMenu.classList.remove("hide");
        customMenu.classList.add("show");
    }

    // Attach click listener to all images with the class "fighter"
    document.querySelectorAll(".fighter").forEach(fighter => {
        fighter.addEventListener("click", openMenu);
    });

    // 3. CHANGE LOGIC: Update image and save when dropdown changes
    slot.addEventListener("change", () => {
        if (activeImage) {
            const selectedOwner = slot.value;

            // Save the selection to LocalStorage
            localStorage.setItem("notes_" + activeImage.alt, selectedOwner);

            // Update the image src on the page
            activeImage.src = "img/smash/render/" + selectedOwner + ".png";
            
            // home_stage.innerText = "Home Stage: " + home_stage_map.get(slot.value)
        }
    });

    // Close menu when clicking away
    document.addEventListener("click", (e) => {
        if (!customMenu.contains(e.target)) {
            customMenu.classList.add("hide");
            customMenu.classList.remove("show");
            initializeImages();
        }
    });

    function loadMaps(){
        fighters_index.set("Mario", "1");
        fighters_index.set("Donkey Kong", "2");
        fighters_index.set("Link", "3");
        fighters_index.set("Samus", "4");
        fighters_index.set("Dark Samus", "5");
        fighters_index.set("Yoshi", "6");
        fighters_index.set("Kirby", "7");
        fighters_index.set("Fox", "8");
        fighters_index.set("Pikachu", "9");
        fighters_index.set("Luigi", "10");
        fighters_index.set("Ness", "11");
        fighters_index.set("Captain Falcon", "12");
        fighters_index.set("Jigglypuff", "13");
        fighters_index.set("Peach", "14");
        fighters_index.set("Daisy", "15");
        fighters_index.set("Bowser", "16");
        fighters_index.set("Ice Climbers", "17");
        fighters_index.set("Sheik", "18");
        fighters_index.set("Zelda", "19");
        fighters_index.set("Dr. Mario", "20");
        fighters_index.set("Pichu", "21");
        fighters_index.set("Falco", "22");
        fighters_index.set("Marth", "23");
        fighters_index.set("Lucina", "24");
        fighters_index.set("Young Link", "25");
        fighters_index.set("Ganondorf", "26");
        fighters_index.set("Mewtwo", "27");
        fighters_index.set("Roy", "28");
        fighters_index.set("Chrom", "29");
        fighters_index.set("Mr. Game & Watch", "30");
        fighters_index.set("Meta Knight", "31");
        fighters_index.set("Pit", "32");
        fighters_index.set("Dark Pit", "33");
        fighters_index.set("Zero Suit Samus", "34");
        fighters_index.set("Wario", "35");
        fighters_index.set("Snake", "36");
        fighters_index.set("Ike", "37");
        fighters_index.set("Pokemon Trainer", "38");
        fighters_index.set("Diddy Kong", "39");
        fighters_index.set("Lucas", "40");
        fighters_index.set("Sonic", "41");
        fighters_index.set("King Dedede", "42");
        fighters_index.set("Olimar", "43");
        fighters_index.set("Lucario", "44");
        fighters_index.set("R.O.B.", "45");
        fighters_index.set("Toon Link", "46");
        fighters_index.set("Wolf", "47");
        fighters_index.set("Villager", "48");
        fighters_index.set("Mega Man", "49");
        fighters_index.set("Wii Fit Trainer", "50");
        fighters_index.set("Rosalina and Luma", "51");
        fighters_index.set("Little Mac", "52");
        fighters_index.set("Greninja", "53");
        fighters_index.set("Palutena", "54");
        fighters_index.set("PAC-Man", "55");
        fighters_index.set("Robin", "56");
        fighters_index.set("Shulk", "57");
        fighters_index.set("Bowser Jr.", "58");
        fighters_index.set("Duck Hunt", "59");
        fighters_index.set("Ryu", "60");
        fighters_index.set("Ken", "61");
        fighters_index.set("Cloud", "62");
        fighters_index.set("Corrin", "63");
        fighters_index.set("Bayonetta", "64");
        fighters_index.set("Inkling", "65");
        fighters_index.set("Ridley", "66");
        fighters_index.set("Simon", "67");
        fighters_index.set("Richter", "68");
        fighters_index.set("King K. Rool", "69");
        fighters_index.set("Isabelle", "70");
        fighters_index.set("Incineroar", "71");
        fighters_index.set("Piranha Plant", "72");
        fighters_index.set("Joker", "73");
        fighters_index.set("Hero", "74");
        fighters_index.set("Banjo & Kazooie", "75");
        fighters_index.set("Terry", "76");
        fighters_index.set("Byleth", "77");
        fighters_index.set("Min Min", "78");
        fighters_index.set("Steve", "79");
        fighters_index.set("Sephiroth", "80");
        fighters_index.set("Pyra/Mythra", "81");
        fighters_index.set("Kazuya", "82");
        fighters_index.set("Sora", "83");
        fighters_index.set("Mii Brawler", "84");
        fighters_index.set("Mii Swordfighter", "85");
        fighters_index.set("Mii Gunner", "86");
        fighters_index.set("Random", "87");
        fighters_index.set(1, "Mario");
        fighters_index.set(2, "Donkey Kong");
        fighters_index.set(3, "Link");
        fighters_index.set(4, "Samus");
        fighters_index.set(5, "Dark Samus");
        fighters_index.set(6, "Yoshi");
        fighters_index.set(7, "Kirby");
        fighters_index.set(8, "Fox");
        fighters_index.set(9, "Pikachu");
        fighters_index.set(10, "Luigi");
        fighters_index.set(11, "Ness");
        fighters_index.set(12, "Captain Falcon");
        fighters_index.set(13, "Jigglypuff");
        fighters_index.set(14, "Peach");
        fighters_index.set(15, "Daisy");
        fighters_index.set(16, "Bowser");
        fighters_index.set(17, "Ice Climbers");
        fighters_index.set(18, "Sheik");
        fighters_index.set(19, "Zelda");
        fighters_index.set(20, "Dr. Mario");
        fighters_index.set(21, "Pichu");
        fighters_index.set(22, "Falco");
        fighters_index.set(23, "Marth");
        fighters_index.set(24, "Lucina");
        fighters_index.set(25, "Young Link");
        fighters_index.set(26, "Ganondorf");
        fighters_index.set(27, "Mewtwo");
        fighters_index.set(28, "Roy");
        fighters_index.set(29, "Chrom");
        fighters_index.set(30, "Mr. Game & Watch");
        fighters_index.set(31, "Meta Knight");
        fighters_index.set(32, "Pit");
        fighters_index.set(33, "Dark Pit");
        fighters_index.set(34, "Zero Suit Samus");
        fighters_index.set(35, "Wario");
        fighters_index.set(36, "Snake");
        fighters_index.set(37, "Ike");
        fighters_index.set(38, "Pokemon Trainer");
        fighters_index.set(39, "Diddy Kong");
        fighters_index.set(40, "Lucas");
        fighters_index.set(41, "Sonic");
        fighters_index.set(42, "King Dedede");
        fighters_index.set(43, "Olimar");
        fighters_index.set(44, "Lucario");
        fighters_index.set(45, "R.O.B.");
        fighters_index.set(46, "Toon Link");
        fighters_index.set(47, "Wolf");
        fighters_index.set(48, "Villager");
        fighters_index.set(49, "Mega Man");
        fighters_index.set(50, "Wii Fit Trainer");
        fighters_index.set(51, "Rosalina and Luma");
        fighters_index.set(52, "Little Mac");
        fighters_index.set(53, "Greninja");
        fighters_index.set(54, "Palutena");
        fighters_index.set(55, "PAC-Man");
        fighters_index.set(56, "Robin");
        fighters_index.set(57, "Shulk");
        fighters_index.set(58, "Bowser Jr.");
        fighters_index.set(59, "Duck Hunt");
        fighters_index.set(60, "Ryu");
        fighters_index.set(61, "Ken");
        fighters_index.set(62, "Cloud");
        fighters_index.set(63, "Corrin");
        fighters_index.set(64, "Bayonetta");
        fighters_index.set(65, "Inkling");
        fighters_index.set(66, "Ridley");
        fighters_index.set(67, "Simon");
        fighters_index.set(68, "Richter");
        fighters_index.set(69, "King K. Rool");
        fighters_index.set(70, "Isabelle");
        fighters_index.set(71, "Incineroar");
        fighters_index.set(72, "Piranha Plant");
        fighters_index.set(73, "Joker");
        fighters_index.set(74, "Hero");
        fighters_index.set(75, "Banjo & Kazooie");
        fighters_index.set(76, "Terry");
        fighters_index.set(77, "Byleth");
        fighters_index.set(78, "Min Min");
        fighters_index.set(79, "Steve");
        fighters_index.set(80, "Sephiroth");
        fighters_index.set(81, "Pyra/Mythra");
        fighters_index.set(82, "Kazuya");
        fighters_index.set(83, "Sora");
        fighters_index.set(84, "Mii Brawler");
        fighters_index.set(85, "Mii Swordfighter");
        fighters_index.set(86, "Mii Gunner");
        fighters_index.set(87, "Random");

        home_stage_map.set("Mario", "???");
        home_stage_map.set("Donkey Kong", "Kongo Jungle");
        home_stage_map.set("Link", "Great Plateau Tower");
        home_stage_map.set("Samus", "Brinstar");
        home_stage_map.set("Dark Samus", "Frigate Orpheon");
        home_stage_map.set("Yoshi", "Super Happy Tree");
        home_stage_map.set("Kirby", "Green Greens");
        home_stage_map.set("Fox", "Corneria");
        home_stage_map.set("Pikachu", "Pokemon Stadium");
        home_stage_map.set("Luigi", "Luigi's Mansion");
        home_stage_map.set("Ness", "Onett");
        home_stage_map.set("Captain Falcon", "Big Blue");
        home_stage_map.set("Jigglypuff", "Pokemon Stadium");
        home_stage_map.set("Peach", "Princess Peach's Castle");
        home_stage_map.set("Daisy", "Figure-8 Circuit");
        home_stage_map.set("Bowser", "Mushroom Kingdom U");
        home_stage_map.set("Ice Climbers", "Summit");
        home_stage_map.set("Sheik", "Hyrule Castle");
        home_stage_map.set("Zelda", "Hyrule Castle");
        home_stage_map.set("Dr. Mario", "Rainbow Cruise");
        home_stage_map.set("Pichu", "Pokemon Stadium");
        home_stage_map.set("Falco", "Lylat Cruise");
        home_stage_map.set("Marth", "Temple");
        home_stage_map.set("Lucina", "Arena Ferox");
        home_stage_map.set("Young Link", "Great Bay");
        home_stage_map.set("Ganondorf", "Hyrule Castle");
        home_stage_map.set("Mewtwo", "???");
        home_stage_map.set("Roy", "Temple");
        home_stage_map.set("Chrom", "Arena Ferox");
        home_stage_map.set("Mr. Game & Watch", "Flat Zone X");
        home_stage_map.set("Meta Knight", "Fountain of Dreams");
        home_stage_map.set("Pit", "Skyworld");
        home_stage_map.set("Dark Pit", "Reset Bomb Forest");
        home_stage_map.set("Zero Suit Samus", "Brinstar Depths");
        home_stage_map.set("Wario", "WarioWare Inc.");
        home_stage_map.set("Snake", "Shadow Moses Island");
        home_stage_map.set("Ike", "Castle Siege");
        home_stage_map.set("Pokemon Trainer", "Pokemon Stadium");
        home_stage_map.set("Diddy Kong", "Jungle Japes");
        home_stage_map.set("Lucas", "New Pork City");
        home_stage_map.set("Sonic", "Green Hill Zone");
        home_stage_map.set("King Dedede", "Dream Land");
        home_stage_map.set("Olimar", "Distant Planet");
        home_stage_map.set("Lucario", "Spear Pillar");
        home_stage_map.set("R.O.B.", "Wrecking Crew");
        home_stage_map.set("Toon Link", "Pirate Ship");
        home_stage_map.set("Wolf", "Venom");
        home_stage_map.set("Villager", "Smashville");
        home_stage_map.set("Mega Man", "Wily Castle");
        home_stage_map.set("Wii Fit Trainer", "Wii Fit Studio");
        home_stage_map.set("Rosalina and Luma", "Mario Galaxy");
        home_stage_map.set("Little Mac", "Boxing Ring");
        home_stage_map.set("Greninja", "Kalos Pokemon League");
        home_stage_map.set("Palutena", "Palutena's Temple");
        home_stage_map.set("PAC-Man", "PAC-LAND");
        home_stage_map.set("Robin", "Arena Ferox");
        home_stage_map.set("Shulk", "Gaur Plain");
        home_stage_map.set("Bowser Jr.", "Delfino Plaza");
        home_stage_map.set("Duck Hunt", "Duck Hunt");
        home_stage_map.set("Ryu", "Suzaku Castle");
        home_stage_map.set("Ken", "Suzaku Castle");
        home_stage_map.set("Cloud", "Midgar");
        home_stage_map.set("Corrin", "Coliseum");
        home_stage_map.set("Bayonetta", "Umbra Clock Tower");
        home_stage_map.set("Inkling", "Moray Towers");
        home_stage_map.set("Ridley", "Brinstar");
        home_stage_map.set("Simon", "Dracula's Castle");
        home_stage_map.set("Richter", "Dracula's Castle");
        home_stage_map.set("King K. Rool", "Kongo Falls");
        home_stage_map.set("Isabelle", "Town and City");
        home_stage_map.set("Incineroar", "Pokemon Stadium 2");
        home_stage_map.set("Piranha Plant", "Mushroom Kingdom");
        home_stage_map.set("Joker", "Mementos");
        home_stage_map.set("Hero", "Yggdrasil's Altar");
        home_stage_map.set("Banjo & Kazooie", "Spiral Mountain");
        home_stage_map.set("Terry", "King of Fighters Stadium");
        home_stage_map.set("Byleth", "Garreg Mach Monastery");
        home_stage_map.set("Min Min", "Spring Stadium");
        home_stage_map.set("Steve", "Minecraft World");
        home_stage_map.set("Sephiroth", "Northern Cave");
        home_stage_map.set("Pyra/Mythra", "Cloud Sea of Alrest");
        home_stage_map.set("Kazuya", "Mishima Dojo");
        home_stage_map.set("Sora", "Hollow Bastion");
        home_stage_map.set("Random", "Random");
    }
});