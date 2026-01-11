declare global {
  interface Window {
    BrowserPrint: any;
  }
}

export interface Printer {
  name: string;
  uid: string;
  connection: string;
  deviceType: string;
  version: number;
  provider: string;
  manufacturer: string;
}

export class BrowserPrintService {
  private device: any = null;

  async getDefaultPrinter(): Promise<Printer> {
    return new Promise((resolve, reject) => {
      if (!window.BrowserPrint) {
        reject(new Error("Browser Print not loaded"));
        return;
      }

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

  async getAvailablePrinters(): Promise<Printer[]> {
    return new Promise((resolve, reject) => {
      if (!window.BrowserPrint) {
        reject(new Error("Browser Print not loaded"));
        return;
      }

      window.BrowserPrint.getLocalDevices(
        (devices: Printer[]) => {
          resolve(devices);
        },
        (error: any) => {
          reject(new Error("Failed to get printers: " + error));
        },
        "printer"
      );
    });
  }

  async printZPL(zpl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.device) {
        reject(new Error("No printer selected"));
        return;
      }

      this.device.send(
        zpl,
        () => {
          resolve();
        },
        (error: any) => {
          reject(new Error("Print failed: " + error));
        }
      );
    });
  }

  async printMultipleLabels(zplCommands: string[]): Promise<void> {
    for (const zpl of zplCommands) {
      await this.printZPL(zpl);
      // Small delay between prints
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

export const printerService = new BrowserPrintService();
