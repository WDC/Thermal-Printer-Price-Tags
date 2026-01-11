# Quick Start Guide

## Get Up and Running in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Test the Interface

Even without a Zebra printer, you can:
- Fill out the label form
- See live preview updates
- Add labels to the queue
- View generated ZPL code

### 4. Connect a Real Printer (Optional)

To actually print labels:

1. **Download Zebra Browser Print**
   - Go to: https://www.zebra.com/us/en/support-downloads/software/printer-software/browser-print.html
   - Download the version for your OS
   - Install and run the application

2. **Replace Mock SDK**
   - Download the real Browser Print JavaScript SDK
   - Replace `public/BrowserPrint-3.1.250.min.js` with the real file

3. **Connect Your Printer**
   - Ensure your Zebra printer is connected (USB or Network)
   - Power on the printer
   - Load 4" x 3" labels

4. **Test Printing**
   - Create a label in the interface
   - Click "Print All"
   - Your label should print!

## Development Tips

### Live Preview
The preview updates in real-time as you type. Try entering:
- Product name: "Federal 9mm 124gr Ammunition (1,000 Rounds)"
- Price: 250
- Features: Add up to 3 bullet points

### Price Positioning
The interface automatically adjusts price positioning:
- 2-digit prices ($10-$99): Right-aligned
- 3-digit prices ($100+): Shifted left to fit

### Queue Management
- Labels persist in localStorage
- View ZPL code by clicking the eye icon
- Remove individual labels or clear all
- Print single or multiple labels in one batch

### Customization
Edit these files to customize:
- `src/lib/zpl.ts` - ZPL template and generation logic
- `src/components/LabelPreview.tsx` - Visual preview
- `tailwind.config.js` - Colors and styling

## Troubleshooting

### "Browser Print not loaded" error
- Ensure Browser Print desktop app is installed and running
- Check that you've replaced the mock SDK with the real one

### Preview not updating
- Clear browser cache
- Restart dev server

### Build errors
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version 16 or higher

## Next Steps

- Customize the ZPL template for your needs
- Add more form fields
- Integrate with your inventory system
- Add barcode/QR code support

Enjoy printing labels!
