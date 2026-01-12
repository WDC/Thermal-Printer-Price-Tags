# Quick Start - Zebra Browser Print Integration

## 🚀 Fast Track Setup (5 Minutes)

### Step 1: Install Browser Print
```bash
# Download from:
https://www.zebra.com/us/en/support-downloads/software/printer-software/browser-print.html

# Install for your OS:
- Windows: Run .exe installer
- macOS: Open .dmg, drag to Applications
- Linux: sudo dpkg -i [package].deb
```

### Step 2: Get the JavaScript SDK
The SDK is either:
- Downloaded separately from Zebra's website, OR
- Located in the Browser Print installation folder

**Find it at:**
- Windows: `C:\Program Files (x86)\Zebra Technologies\Browser Print\samples\`
- macOS: `/Applications/Zebra Browser Print.app/Contents/Resources/samples/`
- Linux: `/usr/share/zebra-browserprint/samples/`

Look for: `BrowserPrint-3.x.x.min.js` or `BrowserPrint-Zebra-1.x.x.min.js`

### Step 3: Replace Mock File
```bash
# Navigate to project
cd /Users/david/pricing

# Replace mock with real SDK
cp /path/to/downloaded/BrowserPrint-3.1.250.min.js public/
```

### Step 4: Connect Printer
- USB: Plug in and power on
- Network: Connect to same network, note IP address

### Step 5: Test
```bash
# Start dev server
npm run dev

# Check Browser Print is running
open http://localhost:9100/available

# Create and print a test label
```

## ✅ Verification Checklist

- [ ] Browser Print desktop app installed
- [ ] Browser Print is running (check system tray/services)
- [ ] Real SDK file replaced mock in `public/` folder
- [ ] Printer connected and powered on
- [ ] http://localhost:9100/available shows printer
- [ ] Test label prints successfully

## 🔧 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Printer not found | Check Browser Print is running, visit http://localhost:9100/available |
| Port 9100 error | Stop other apps using port 9100, restart Browser Print |
| Nothing prints | Check printer has labels, is not paused, no paper jam |
| CORS error | Using mock instead of real SDK, replace the file |
| "Device undefined" | Browser Print not running or printer not connected |

## 📱 Testing Without Printer

Use the mock mode (already set up):
```bash
# Just run the app as-is
npm run dev

# ZPL will be logged to console
# Check browser DevTools > Console
```

Or use ZPL viewer:
- Visit: https://labelary.com/viewer.html
- Copy ZPL code from the modal
- Paste and see rendered label

## 🔗 Important URLs

- **Browser Print Status**: http://localhost:9100/available
- **Default Printer**: http://localhost:9100/default
- **Settings**: http://localhost:9100/settings
- **ZPL Viewer**: https://labelary.com/viewer.html
- **Zebra Support**: https://www.zebra.com/us/en/support.html

## 📖 Full Documentation

See [BROWSER_PRINT_SETUP.md](./BROWSER_PRINT_SETUP.md) for complete setup guide.

## 💡 Pro Tips

1. **Keep Browser Print Running**: Add to startup apps
2. **Set Default Printer**: Configure in Browser Print settings
3. **Test Connection First**: Visit http://localhost:9100/available before printing
4. **Save ZPL Codes**: Use the "Copy" button to save templates
5. **Batch Print**: Queue multiple labels, print in one shot
