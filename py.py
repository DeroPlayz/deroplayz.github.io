import os
import requests
import time

# Folder to save images
SAVE_FOLDER = "smash_ultimate_renders"
# Official high-res asset URL pattern
# Format: https://www.smashbros.com/assets_v2/img/fighter/[name]/main.png
BASE_CDN_URL = "https://www.smashbros.com/assets_v2/img/fighter/{}/main.png"

# The official internal IDs for every fighter in Ultimate
FIGHTERS = [
    "mario", "donkey_kong", "link", "samus", "dark_samus", "yoshi", "kirby", "fox", "pikachu", "luigi",
    "ness", "captain_falcon", "jigglypuff", "peach", "daisy", "bowser", "ice_climbers", "sheik", "zelda",
    "dr_mario", "pichu", "falco", "marth", "lucina", "young_link", "ganondorf", "mewtwo", "roy", "chrom",
    "mr_game_and_watch", "meta_knight", "pit", "dark_pit", "zero_suit_samus", "wario", "snake", "ike",
    "pokemon_trainer", "squirtle", "ivysaur", "charizard", "diddee_kong", "lucas", "sonic", "king_dedede",
    "olimar", "lucario", "rob", "toon_link", "wolf", "villager", "mega_man", "wii_fit_trainer", "rosalina_and_luma",
    "little_mac", "greninja", "mii_fighter", "palutena", "pac_man", "robin", "shulk", "bowser_jr", "duck_hunt",
    "ryu", "ken", "cloud", "corrin", "bayonetta", "inkling", "ridley", "simon", "richter", "king_k_rool",
    "isabelle", "incineroar", "piranha_plant", "joker", "hero", "banjo_and_kazooie", "terry", "byleth",
    "minmin", "steve", "sephiroth", "pyra", "mythra", "kazuya", "sora"
]

def download_official_renders():
    if not os.path.exists(SAVE_FOLDER):
        os.makedirs(SAVE_FOLDER)

    print(f"Starting download of {len(FIGHTERS)} main renders...")
    
    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0'})

    for fighter in FIGHTERS:
        url = BASE_CDN_URL.format(fighter)
        filename = f"{fighter}_SSBU.png"
        path = os.path.join(SAVE_FOLDER, filename)

        if os.path.exists(path):
            continue

        print(f"Fetching: {fighter}...")
        try:
            response = session.get(url, stream=True)
            if response.status_code == 200:
                with open(path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
            else:
                print(f"  [!] Skipped {fighter} (Status {response.status_code})")
            
            # Very short delay to avoid rate limiting
            time.sleep(0.1)
        except Exception as e:
            print(f"  [X] Error downloading {fighter}: {e}")

    print("\nDownload complete. Check the 'smash_ultimate_renders' folder!")

if __name__ == "__main__":
    download_official_renders()