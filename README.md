# ZPL Label Printer

A modern web interface for creating and printing ZPL labels using Zebra Browser Print. Built with React, TypeScript, Tailwind CSS, and Shadcn UI.

## Features

- Live preview of labels as you type
- Queue multiple labels for batch printing
- Dynamic price positioning (handles 2-digit and 3-digit prices)
- Up to 3 customizable feature lines
- Modern, animated UI with smooth transitions
- Local storage persistence for print queue
- ZPL code preview
- Zebra Browser Print integration

## Prerequisites

1. **Zebra Browser Print**: Download and install from [Zebra's website](https://www.zebra.com/us/en/support-downloads/software/printer-software/browser-print.html)
2. **Zebra Thermal Printer**: A compatible Zebra printer connected to your system
3. **Node.js**: Version 16 or higher

## Installation

1. Install dependencies:
```bash
npm install
```

2. **Set up Zebra Browser Print** (for real printer functionality):
   - See [BROWSER_PRINT_SETUP.md](./BROWSER_PRINT_SETUP.md) for detailed setup instructions
   - Download and install Browser Print desktop application
   - Download the Browser Print JavaScript SDK
   - Replace `public/BrowserPrint-3.1.250.min.js` with the real SDK file

   **Note**: The current setup includes a mock SDK for development/testing without a physical printer.

## Development

### Development Mode (with Mock Printer)

The application includes a mock Browser Print SDK that simulates printer functionality:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

- Labels will be logged to the browser console instead of printing
- All features work normally except actual printing
- Perfect for development and testing UI/UX

### Production Mode (with Real Printer)

1. Follow the [Browser Print Setup Guide](./BROWSER_PRINT_SETUP.md)
2. Replace the mock SDK with the real one
3. Start the development server
4. Connect to a physical Zebra printer

## Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

1. **Create a Label**:
   - Enter product name
   - Enter price (automatically handles 2-digit and 3-digit prices)
   - Add up to 3 feature lines
   - Click "Add to Queue"

2. **Preview Labels**:
   - See a live preview as you type
   - View queued labels in the print queue

3. **Print Labels**:
   - Add multiple labels to the queue
   - Click "Print All" to send all labels to your Zebra printer
   - View ZPL code by clicking the eye icon on any queued label

## Label Specifications

- **Size**: 4" x 3" thermal label
- **Product Name**: 35pt font
- **Price**: 170pt font (dynamic positioning)
- **Features**: 29pt font, up to 3 lines
- **Logo**: Embedded graphic (GFA format)

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Shadcn UI**: Component library
- **Lucide React**: Icons
- **Zebra Browser Print**: Printer integration

## Customization

### Modifying ZPL Template

Edit `src/lib/zpl.ts` to customize the label layout:

```typescript
export function generateZPL(data: LabelData): string {
  // Modify ZPL commands here
}
```

### Changing Label Preview

Edit `src/components/LabelPreview.tsx` to adjust the visual preview:

```typescript
// Modify the mockup rendering
```

## Browser Compatibility

- Chrome/Edge (Recommended)
- Firefox
- Safari

Note: Zebra Browser Print requires the desktop application to be installed and running.

## Troubleshooting

### Printer Not Found

1. Ensure Zebra Browser Print is installed and running
2. Check that your printer is connected and powered on
3. Verify printer drivers are installed

### Labels Not Printing

1. Check printer connection in Browser Print configuration
2. Verify ZPL code by viewing the preview
3. Ensure printer has labels loaded

### Development Mode

The application includes a mock Browser Print library for development. Replace it with the actual SDK for production use.

## License

MIT

## Support

For issues with:
- **This application**: Open an issue in this repository
- **Zebra Browser Print**: Visit [Zebra Support](https://www.zebra.com/us/en/support-downloads.html)
