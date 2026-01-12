# Zebra Browser Print Setup Guide

This guide will help you integrate the real Zebra Browser Print SDK and connect to actual Zebra printers.

## Prerequisites

- A Zebra thermal printer (ZD421, ZD620, etc.)
- Printer connected via USB or Network
- Windows, macOS, or Linux computer

## Step 1: Install Zebra Browser Print Desktop Application

### Download Browser Print

1. Visit: https://www.zebra.com/us/en/support-downloads/software/printer-software/browser-print.html
2. Download the appropriate version for your operating system:
   - **Windows**: BrowserPrint-Windows-v1.x.x.exe
   - **macOS**: BrowserPrint-macOS-v1.x.x.dmg
   - **Linux**: BrowserPrint-Linux-v1.x.x.deb or .rpm

### Install the Application

**Windows:**
```bash
# Run the installer
BrowserPrint-Windows-v1.x.x.exe

# Follow the installation wizard
# Browser Print will start automatically after installation
```

**macOS:**
```bash
# Open the DMG file
open BrowserPrint-macOS-v1.x.x.dmg

# Drag Browser Print to Applications folder
# Launch Browser Print from Applications

# Note: You may need to allow the app in System Preferences > Security & Privacy
```

**Linux (Ubuntu/Debian):**
```bash
# Install the .deb package
sudo dpkg -i BrowserPrint-Linux-v1.x.x.deb

# Start the service
sudo systemctl start zebra-browserprint

# Enable on boot (optional)
sudo systemctl enable zebra-browserprint
```

### Verify Installation

1. Browser Print should appear in your system tray (Windows/macOS) or run as a service (Linux)
2. Access the web interface: http://localhost:9100/available
3. You should see a JSON response with available printers

## Step 2: Download the Browser Print JavaScript SDK

### Option A: Download from Zebra Website

1. Visit the same download page: https://www.zebra.com/us/en/support-downloads/software/printer-software/browser-print.html
2. Look for "Browser Print JavaScript SDK" or "Browser Print Developer Resources"
3. Download the JavaScript library (usually named `BrowserPrint-3.x.x.min.js` or similar)

### Option B: Extract from Desktop Application

The JavaScript SDK is also included in the desktop application installation:

**Windows:**
```
C:\Program Files (x86)\Zebra Technologies\Browser Print\samples\
```

**macOS:**
```
/Applications/Zebra Browser Print.app/Contents/Resources/samples/
```

**Linux:**
```
/usr/share/zebra-browserprint/samples/
```

Look for files like:
- `BrowserPrint-3.x.x.min.js`
- `BrowserPrint-Zebra-1.x.x.min.js`

## Step 3: Replace the Mock SDK

1. Copy the real SDK file you downloaded
2. Replace the mock file in your project:

```bash
# Navigate to your project
cd /Users/david/pricing

# Backup the mock file (optional)
mv public/BrowserPrint-3.1.250.min.js public/BrowserPrint-3.1.250.min.js.bak

# Copy the real SDK (adjust the version number and path as needed)
cp ~/Downloads/BrowserPrint-3.1.250.min.js public/
```

## Step 4: Connect Your Printer

### USB Connection

1. Connect your Zebra printer via USB
2. Turn on the printer
3. Install printer drivers if prompted by your OS
4. Verify the printer appears in your system's printer list

### Network Connection

1. Connect the printer to your network (Ethernet or Wi-Fi)
2. Print a network configuration label to get the IP address:
   - Power on the printer
   - Hold the feed button for 2 seconds
   - Release when the light flashes
   - A configuration label will print showing the IP address

3. Verify network connectivity:
```bash
# Ping the printer
ping <printer-ip-address>

# Test ZPL via raw socket (optional)
telnet <printer-ip-address> 9100
```

## Step 5: Test the Connection

1. Ensure Browser Print is running (check system tray or service status)
2. Start your development server:
```bash
npm run dev
```

3. Open the application in your browser
4. Try creating and printing a label

### Troubleshooting

**Printer Not Found:**
- Verify Browser Print is running
- Check http://localhost:9100/available in browser
- Ensure printer is powered on and connected
- Restart Browser Print application

**Connection Refused:**
- Check if port 9100 is blocked by firewall
- Verify Browser Print is running with correct permissions
- Try restarting the Browser Print service

**Print Job Not Printing:**
- Check printer has labels loaded
- Verify printer is not in pause mode
- Check for paper jams
- Review printer status: http://localhost:9100/default

**CORS Errors:**
- Browser Print should handle CORS automatically
- Ensure you're using the real SDK, not the mock
- Try accessing via http://localhost (not https)

## Step 6: Configure Printer Settings (Optional)

### Access Browser Print Settings

Visit: http://localhost:9100/settings

You can configure:
- Default printer
- Port numbers
- Security settings
- Logging level

### Set Default Printer

The application will automatically use the default printer, but you can specify one:

```javascript
// In src/lib/browserPrint.ts
export class BrowserPrintService {
  async getDefaultPrinter(): Promise<Printer> {
    // This will use the printer configured in Browser Print settings
    return new Promise((resolve, reject) => {
      window.BrowserPrint.getDefaultDevice(
        "printer",
        (device: Printer) => {
          this.device = new window.BrowserPrint.Device(device);
          resolve(device);
        },
        (error: any) => {
          reject(new Error("Failed to get default printer: " + error));
        }
      );
    });
  }
}
```

## Step 7: Production Deployment

### HTTPS Considerations

Browser Print uses HTTP by default (localhost:9100). For production:

1. Browser Print must be running on the client machine
2. CORS is automatically handled for localhost
3. If deploying to HTTPS, users must have Browser Print installed locally

### User Instructions

Include these instructions for end users:

1. Download and install Browser Print from Zebra's website
2. Connect their Zebra printer
3. Ensure Browser Print is running before using your application
4. Grant browser permissions if prompted

## API Reference

### Common Methods

```javascript
// Get available printers
BrowserPrint.getLocalDevices(
  function(devices) {
    console.log("Found printers:", devices);
  },
  function(error) {
    console.error("Error:", error);
  },
  "printer"
);

// Get default printer
BrowserPrint.getDefaultDevice(
  "printer",
  function(device) {
    console.log("Default printer:", device);
  },
  function(error) {
    console.error("Error:", error);
  }
);

// Send ZPL to printer
var device = new BrowserPrint.Device(printerObject);
device.send(
  zplCode,
  function() {
    console.log("Print successful");
  },
  function(error) {
    console.error("Print failed:", error);
  }
);
```

## Additional Resources

- **Official Documentation**: https://www.zebra.com/us/en/support-downloads/software/printer-software/browser-print.html
- **Developer Forum**: https://developer.zebra.com/
- **ZPL Programming Guide**: https://www.zebra.com/us/en/support-downloads/knowledge-articles/zpl-programming-guide.html
- **Sample Code**: Check the `samples` folder in the Browser Print installation

## Support

For issues with:
- **This application**: Open an issue in the project repository
- **Browser Print**: Contact Zebra Technical Support
- **Printer hardware**: Refer to printer manual or Zebra support

## Testing Without a Physical Printer

If you don't have a physical printer, you can:

1. **Use the mock mode** (current setup) - console.log output
2. **ZPL Viewer**: https://labelary.com/viewer.html - paste ZPL code to see preview
3. **Zebra Setup Utilities**: Some versions include a virtual printer
4. **Raw Print to File**: Configure a virtual printer to save to PDF

## Security Notes

- Browser Print runs locally on port 9100
- Only accessible from localhost by default
- No sensitive data is transmitted over the network
- ZPL code is sent directly to the printer
- Consider label content when printing sensitive information
