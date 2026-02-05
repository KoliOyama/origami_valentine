# Visual Style Guide - Origami Valentine

This document serves as the source of truth for the UI design system. All generated code must adhere to these tokens, typography rules, and component styles.

## 1. Color Palette

### Primary Colors
* **Background Pink:** `#FBC9D5`
    * *Usage:* Global application background.
* **Primary Brown:** `#7F3A27`
    * *Usage:* Primary buttons, Heading text, bold accents.
* **Accent Red:** `#C92A46`
    * *Usage:* Hearts, decorative icons, error states (if applicable).
* **Surface White:** `#FFFFFF`
    * *Usage:* Form containers, input field backgrounds.

### Semantic Mapping
| Variable Name | Hex Value | Description |
| :--- | :--- | :--- |
| `--color-bg` | `#FBC9D5` | Main screen background |
| `--color-text-main` | `#7F3A27` | Headings and primary actions |
| `--color-text-body` | `#1A1A1A` | (Derived) Input text and standard copy |
| `--color-accent` | `#C92A46` | Hearts and highlights |
| `--color-surface` | `#FFFFFF` | Card backgrounds |

---

## 2. Typography

### Fonts
1.  **Display (Headings):** `Maragsa`
    * *Usage:* Titles ("Create your Origami Valentine", "Ready!"), Names ("To Rosemary"), Action ("click").
    * *Characteristics:* Serif, high contrast, elegant.
2.  **Body (UI & Forms):** `Inter`
    * *Usage:* Input labels, placeholder text, explanatory copy, button text.
    * *Characteristics:* Sans-serif, clean, legible.
3.  **Display 2 (Special):** `Luxurious Script`
    * *Usage:* Reminder page text, special decorative flourishes.

---

## 3. UI Components

### Buttons
* **Primary Action:**
    * Background: `#7F3A27` (Primary Brown)
    * Text Color: `#FFFFFF` (White)
    * Font: *Inter* (Medium weight)
    * Border Radius: `8px` (Approx. standard rounded)
    * Width: Full width within container
    * Height: `48px` (Touch accessible)
    * State: Solid fill.

### Cards & Containers
* **Form Card (White Box):**
    * Background: `#FFFFFF`
    * Border Radius: `8px` (Large rounded corners)
    * Padding: `24px`
    * Shadow: Soft/Subtle drop shadow (optional based on flattened look)

### Input Fields
* **Style:** Outlined with icon.
* **Background:** `#FFFFFF` or Transparent inside the white card.
* **Border:** Thin Light Gray (e.g., `#E5E7EB`) solid line.
* **Radius:** `8px` to `12px`.
* **Layout:** Icon on the left (User/Person icon), Text input on the right.
* **Labels:** Top-aligned, *Inter* font.

### Iconography
* **Icon package** Solar icons (already installed)

---

## 4. Layout Patterns

* **Mobile First:** Single column layout.


## 5. CSS/Tailwind Implementation Reference

```css
/* Recommended Tailwind Config Extension */
theme: {
  extend: {
    colors: {
      valentine: {
        bg: '#FBC9D5',
        brown: '#7F3A27',
        red: '#C92A46',
      }
    },
    fontFamily: {
      serif: ['Maragsa', 'serif'],
      sans: ['Inter', 'sans-serif'],
      script: ['"Luxurious Script"', 'cursive'],
    }
  }
}