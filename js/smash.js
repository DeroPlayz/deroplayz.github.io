/* smash.js */
document.addEventListener("DOMContentLoaded", () => {
    const customMenu = document.getElementById("custom-menu");
    const menuTitle = document.getElementById("menu-title");
    const slot = document.getElementById("slot"); // Our <select> dropdown
    const home_stage = document.getElementById("home_stage");
    let activeImage = null; 

    const home_stage_map = new Map();
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
    home_stage_map.set("Pyra & Mythra", "Cloud Sea of Alrest");
    home_stage_map.set("Kazuya", "Mishima Dojo");
    home_stage_map.set("Sora", "Hollow Bastion");
    home_stage_map.set("Random", "Random");

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

    const resetter = document.getElementById("reset");
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
        // menuTitle.innerText = activeImage.alt;
        
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
            
            home_stage.innerText = "Home Stage: " + home_stage_map.get(slot.value)
        }
    });

    // Close menu when clicking away
    document.addEventListener("click", (e) => {
        if (!customMenu.contains(e.target)) {
            customMenu.classList.add("hide");
            customMenu.classList.remove("show");
        }
    });
});