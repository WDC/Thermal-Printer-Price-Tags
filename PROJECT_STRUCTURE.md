# Project Structure

```
pricing/
├── public/
│   └── BrowserPrint-3.1.250.min.js    # Zebra Browser Print SDK (mock - replace with real)
├── src/
│   ├── components/
│   │   ├── ui/                         # Shadcn UI components
│   │   │   ├── button.tsx              # Button component
│   │   │   ├── card.tsx                # Card component
│   │   │   ├── input.tsx               # Input component
│   │   │   └── label.tsx               # Label component
│   │   ├── LabelForm.tsx               # Form for creating labels
│   │   ├── LabelPreview.tsx            # Live preview of labels
│   │   └── PrintQueue.tsx              # Print queue management
│   ├── lib/
│   │   ├── browserPrint.ts             # Zebra Browser Print integration
│   │   ├── utils.ts                    # Utility functions
│   │   └── zpl.ts                      # ZPL generation logic
│   ├── App.tsx                         # Main application component
│   ├── index.css                       # Global styles + Tailwind
│   └── main.tsx                        # Application entry point
├── index.html                          # HTML template
├── package.json                        # Dependencies and scripts
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── vite.config.ts                      # Vite build configuration
├── postcss.config.js                   # PostCSS configuration
├── README.md                           # Full documentation
└── QUICKSTART.md                       # Quick start guide

## Key Files Explained

### Core Application Files

**src/App.tsx**
- Main application container
- Manages state for queue and preview
- Handles localStorage persistence
- Layouts header, main content, and footer

**src/main.tsx**
- Application entry point
- Mounts React app to DOM

### Components

**src/components/LabelForm.tsx**
- Form inputs for product name, price, and features
- Live preview updates on input change
- Form validation
- Add to queue functionality

**src/components/LabelPreview.tsx**
- Visual mockup of the label
- Updates in real-time as user types
- Shows dynamic price positioning
- Displays all label elements

**src/components/PrintQueue.tsx**
- Displays queued labels
- Remove/clear queue functionality
- Print all labels button
- ZPL code viewer modal
- Printer status feedback

### UI Components (Shadcn)

**src/components/ui/***
- Reusable UI components
- Styled with Tailwind CSS
- Accessible and customizable
- Based on Shadcn UI design system

### Library Files

**src/lib/zpl.ts**
- ZPL template generation
- Label data interface
- Price positioning logic
- Feature line rendering
- Logo graphic (GFA format)

**src/lib/browserPrint.ts**
- Zebra Browser Print integration
- Printer discovery
- Print job management
- TypeScript types for Browser Print API

**src/lib/utils.ts**
- Utility functions
- Class name merging (cn)
- Shared helper functions

### Configuration Files

**package.json**
- Project dependencies
- NPM scripts (dev, build, preview)
- Project metadata

**vite.config.ts**
- Vite build configuration
- Path aliases (@/* → src/*)
- React plugin setup

**tailwind.config.js**
- Tailwind CSS theme
- Custom colors (Shadcn palette)
- Animations
- Design tokens

**tsconfig.json**
- TypeScript compiler options
- Module resolution
- Path mappings
- Strict type checking

## Data Flow

1. **User Input** → LabelForm component
2. **Form Change** → getCurrentLabel() → onPreviewChange callback
3. **Preview Update** → LabelPreview component renders
4. **Add to Queue** → App state updated → PrintQueue displays
5. **Print All** → generateZPL() → BrowserPrint.send()

## Features Implemented

- Live label preview with real-time updates
- Dynamic price positioning (2-digit vs 3-digit)
- Print queue with localStorage persistence
- Batch printing multiple labels
- ZPL code preview
- Modern UI with animations
- Responsive design
- Printer status feedback
- Form validation

## Customization Points

### Change Label Template
Edit `src/lib/zpl.ts` → `generateZPL()` function

### Modify Preview Look
Edit `src/components/LabelPreview.tsx` → return statement

### Add More Form Fields
Edit `src/components/LabelForm.tsx` → add inputs and state

### Change Colors/Theme
Edit `tailwind.config.js` → theme.extend.colors

### Update Logo
Edit `src/lib/zpl.ts` → replace LOGO_GFA constant
(Convert image to ZPL using Zebra's ZPL utility)

## Tech Stack Summary

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Components**: Shadcn UI
- **Icons**: Lucide React
- **Printer**: Zebra Browser Print SDK
- **State**: React useState/useEffect
- **Storage**: localStorage API
