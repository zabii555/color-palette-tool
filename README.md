# Lexure Color Palette Tool

A modern, professional React + Tailwind CSS application for extracting and managing color palettes from images with a luxury black and gold design theme.

## Features

✨ **Image Upload & Color Extraction**
- Upload images in JPG, PNG, or WEBP format
- Automatically extract 5 dominant colors using the Color Thief library
- Fast and efficient color analysis

🎨 **Color Display**
- Beautiful grid layout showcasing extracted colors
- Display RGB values, Hex codes, and color previews
- Copy buttons for quick color value copying

🖌️ **Custom Color Picker**
- Interactive color picker using React Color
- Choose any custom color you want
- Copy Hex and RGB values with one click

📱 **Responsive Design**
- Fully responsive across all device sizes
- Mobile-first approach
- Optimized for tablets, laptops, and desktops

✨ **Modern Luxury Theme**
- Premium black and gold color scheme
- Smooth gradients and hover effects
- Professional glass-morphism UI elements

## Tech Stack

- **React** 18.2.0 - UI library
- **Tailwind CSS** 3.3.0 - Utility-first CSS framework
- **Vite** 4.3.0 - Lightning-fast build tool
- **React Color** 2.19.3 - Color picker component
- **Color Thief** 2.3.2 - Color extraction library
- **PostCSS** 8.4.24 - CSS processing
- **Autoprefixer** 10.4.14 - CSS vendor prefixing

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone or navigate to the project directory:**
```bash
cd color
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The app will automatically open at `http://localhost:5173`

## Usage

1. **Upload an Image:**
   - Click the "Choose Image" button
   - Select a JPG, PNG, or WEBP image
   - The app will automatically extract the 5 dominant colors

2. **View Extracted Colors:**
   - See the uploaded image preview on the left
   - View extracted colors with their Hex and RGB values
   - Hover over color boxes for interactive effects

3. **Copy Colors:**
   - Click "Copy Hex" to copy the hexadecimal color code
   - Click "Copy RGB" to copy the RGB color value
   - Feedback shows when color is copied

4. **Use Custom Color Picker:**
   - Scroll to the Custom Color Picker section
   - Click the color picker to choose any color
   - Copy Hex or RGB values of your selected color
   - Preview the selected color in real-time

## Project Structure

```
color/
├── App.jsx                 # Main React component
├── main.jsx               # React DOM entry point
├── index.html             # HTML entry file
├── index.css              # Global styles and Tailwind imports
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── .gitignore             # Git ignore rules
```

## Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint code quality checks

## Building for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Color Extraction Details

The app uses the **Color Thief** library to extract the 5 most dominant colors from your uploaded image. The extraction process:

1. Analyzes the pixel data of the image
2. Groups similar colors together
3. Returns the top 5 most frequent color combinations
4. Converts RGB values to Hex format for easy copying

## Customization

### Change Gold/Yellow Accent Color

Edit the Tailwind config or override in CSS:

```css
.some-element {
  @apply bg-gradient-to-r from-purple-400 to-purple-500;
}
```

### Modify Number of Extracted Colors

In `App.jsx`, change the number in this line:
```javascript
const palette = await colorThief.getPalette(img, 5);
```

Change `5` to your desired number of colors.

### Adjust Upload Image Size Limit

The current limit is controlled by the browser. To add backend validation, modify the file input handler in `App.jsx`.

## Performance Tips

- Use high-quality images for better color extraction
- Images with clear, distinct colors work best
- Consider optimizing large images before upload
- The app processes images efficiently on modern browsers

## Troubleshooting

**Colors not extracting?**
- Ensure image format is JPG, PNG, or WEBP
- Try a different image with more distinct colors
- Check browser console for error messages

**Colors look incorrect?**
- Some color combinations may appear different due to CORS restrictions
- Try opening in a private/incognito window
- Verify the original image has clear color separation

**App not responding?**
- Refresh the page (Ctrl+R or Cmd+R)
- Check that all dependencies are installed: `npm install`
- Ensure you're running the latest version of Node.js

## License

© 2026 Lexure. All rights reserved.

Professional Color Extraction & Management Tool

## Support

For issues or feature requests, please reach out through the project repository.

---

**Enjoy extracting beautiful color palettes with Lexure!** ✨
