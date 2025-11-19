from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_audio_studio(page: Page):
    # Navigate to the audio demo page
    page.goto("http://localhost:3000/demos/audio")

    # Wait for the main title to be visible
    expect(page.get_by_role("heading", name="STUDIO ONE")).to_be_visible()

    # Verify core sections are present
    expect(page.get_by_text("Professional Groove Workstation")).to_be_visible()
    expect(page.get_by_text("BPM")).to_be_visible()

    # Verify Transport controls
    expect(page.get_by_role("button", name="PLAY")).to_be_visible()
    expect(page.get_by_role("button", name="MAGIC")).to_be_visible()
    expect(page.get_by_role("button", name="CLEAR")).to_be_visible()

    # Verify Track Names (some examples) - first() because they appear in Sequencer and Mixer
    expect(page.get_by_text("KICK").first).to_be_visible()
    expect(page.get_by_text("SNARE").first).to_be_visible()
    expect(page.get_by_text("BASS").first).to_be_visible()

    # Verify FX Section
    expect(page.get_by_text("MASTER FX")).to_be_visible()
    expect(page.get_by_text("REVERB")).to_be_visible()

    # Wait a bit for the visualizer to possibly render something (though it might be empty if no audio)
    time.sleep(1)

    # Take a screenshot
    page.screenshot(path="verification/audio_studio.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_audio_studio(page)
        finally:
            browser.close()
