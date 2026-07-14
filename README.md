# Freshworks Organic UTM Builder 🚀

A custom Chrome extension designed specifically for the Freshworks social team to automate and standardize UTM link generation for organic social campaigns. 

This tool eliminates manual data entry, prevents formatting errors, and speeds up the publishing workflow by intelligently reading your current browser context.

## ✨ Key Features

* **Smart Domain Lock:** Automatically fetches the URL of the active tab *only* if you are on a `freshworks.com` (or subdomain) page. Prevents accidental UTM generation for external sites.
* **Context-Aware Platform Selection:** Auto-detects if you are currently drafting a post on LinkedIn, X (Twitter), Facebook, or Instagram and assigns the `utm_medium` accordingly.
* **Campaign Presets (Settings Page):** Map friendly campaign names (e.g., "Refresh 2026") to standard UTM values (e.g., "refresh26"). Accessible via the "⚙️ Settings" link.
* **Auto-Sanitization:** Automatically converts custom campaign inputs to lowercase and replaces spaces with hyphens to keep Google Analytics data clean.
* **Dynamic Content Tags:** Automatically generates the `utm_content` tag using the structure `fw` + `[format]` + `[today's date in ddmmmm]`.
* **One-Click Copy:** Generates the complete, standardized URL and instantly copies it to your clipboard.

## 🔗 UTM Structure
The extension strictly enforces the following organic social structure:
`[URL]?utm_source=social&utm_medium=[platform]&utm_campaign=[campaign]&utm_term=organic&utm_content=fw[format][ddmmmm]`

## 🛠 Installation Guide

Since this is a custom internal tool, you can install it directly in developer mode:

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right corner).
4. Click the **Load unpacked** button in the top left.
5. Select the folder containing these extension files.
6. **Pin** the extension to your Chrome toolbar for easy access.

## 📖 How to Use

1. **Configure Campaigns:** Click the extension icon and hit **⚙️ Settings**. Add your active campaigns and their corresponding UTM tags, then save.
2. **Generate a Link:** * Navigate to the Freshworks landing page you want to share.
   * Click the UTM Builder icon (the URL will auto-fill).
   * Select your campaign from the dropdown and the creative format (Image, Video, Carousel, etc.).
   * Click **Generate & Copy URL**.
3. **Paste & Post:** Drop the generated link into your social post!

## 📂 File Structure

* `manifest.json`: Configuration, permissions (`activeTab`, `storage`, `clipboardWrite`), and metadata.
* `popup.html` / `popup.js`: The main user interface and logic for generating/copying the UTMs.
* `options.html` / `options.js`: The settings page for managing saved campaign presets.
* `style.css`: Styling for a clean, Freshworks-friendly interface.

---
*Built to streamline organic social operations at Freshworks.*
