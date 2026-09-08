import pyautogui
import time
import random
import os
import sys

print(pyautogui.position())
pyautogui.moveTo(500, 500, duration=2)

# def move_mouse():
#     """Moves the mouse to a random position on the screen."""
#     screen_width, screen_height = pyautogui.size()

#     # Avoid edges
#     x = random.randint(10, screen_width - 10)
#     y = random.randint(10, screen_height - 10)

#     # Smooth movement
#     duration = random.uniform(0.3, 1.2)
#     pyautogui.moveTo(x, y, duration=duration)

#     # Occasional scroll
#     if random.random() < 0.2:
#         pyautogui.scroll(random.randint(-3, 3))
def move_mouse():
    print("Moving mouse...")
    pyautogui.moveTo(500, 500, duration=2)
    time.sleep(1)
    pyautogui.moveTo(1000, 500, duration=2)

def get_random_name():
    """Generates a random filename for the script."""
    names = [
        'dailybetter_backend',
        'dailybetter_frontend',
        'js_compiler',
        'node_runner',
        'webpack_dev',
        'react_dev'
    ]
    return random.choice(names) + '.py'

def main():
    print(f"Running stealth mouse mover: {os.path.basename(__file__)}")
    print("Press Ctrl+C to stop.")
    print("The script will run indefinitely in the background.")

    while True:
        move_mouse()

        # Random delay to look human
        sleep_time = random.uniform(5.0, 20.0)
        time.sleep(sleep_time)

if __name__ == "__main__":
    # Small startup delay
    time.sleep(1)

    # Enable fail-safe (move mouse to any corner to stop)
    pyautogui.FAILSAFE = True

    try:
        main()
    except KeyboardInterrupt:
        print("\nExiting...")
        sys.exit(0)
    except pyautogui.FailSafeException:
        print("\nFail-safe triggered (mouse moved to corner). Exiting.")
        sys.exit(0)