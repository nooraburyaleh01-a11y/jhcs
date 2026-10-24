# CNIPMS — Controlled Narcotics Inventory & Prescription Management System

English web application using Google Sheets as the only database, Google Apps Script for server-side validation and stock operations, GitHub for source control, and Vercel for hosting.

## Important security note

This version deliberately uses constants in source code instead of Vercel Environment Variables or Apps Script Script Properties. **The GitHub repository must be PRIVATE. Do not publish this source publicly** because `api/index.js` and `apps-script/Code.gs` contain the shared API token. The app build has no login screen; before entering real controlled-drug or patient/prescription data, restrict access to the Vercel deployment using Vercel Deployment Protection or an equivalent access control.

## 1. Configure Google Sheets and Apps Script

1. Open your Google Sheets file. Copy its ID from the URL: the part between `/d/` and `/edit`.
2. Open **Extensions → Apps Script** from that spreadsheet.
3. Replace the editor code with `apps-script/Code.gs` from this package.
4. Near the top of `Code.gs`, find `CNIPMS_SPREADSHEET_ID` and replace `PASTE_YOUR_GOOGLE_SHEETS_ID_HERE` with your actual spreadsheet ID. Do not add quotation marks beyond those already in the code.
5. Save the Apps Script project. Select `initializeDatabase` and click **Run**, then authorize access. It creates the required tabs and headers.
6. Select **Deploy → New deployment → Web app**. Choose **Execute as: Me** and **Who has access: Anyone**, then deploy and copy the Web App URL ending in `/exec`. The API token still checks requests, but public access to the app itself must be restricted at Vercel.
7. If Apps Script code changes after deployment, go to **Deploy → Manage deployments → Edit → New version → Deploy**.

Created tabs: `settings`, `genericDrugs`, `brandProducts`, `stock`, `reorderLevels`, `receipts`, `vouchers`, `prescriptions`, `movements`, `cancellations`, and `adjustments`.

## 2. Configure Vercel proxy

1. Open `api/index.js`. Replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` in `CNIPMS_GAS_URL` with the `/exec` URL from the previous section.
2. The shared API token is already present in both `api/index.js` and `apps-script/Code.gs`. Do not change it in one file alone. If you change it, update both files to exactly the same value.
3. No Vercel Environment Variables or Apps Script Script Properties are required.

## 3. Upload to GitHub and deploy on Vercel

Repository target: `https://github.com/nooraburyaleh01-a11y/CNIPMS`

1. Set the GitHub repository to **Private** before uploading these files.
2. Extract the ZIP and upload its contents to the repository root (not the ZIP itself).
3. In Vercel, import the repository or connect the existing project to it, then deploy. No Environment Variables are needed.
4. After changing `api/index.js` or Apps Script code, redeploy Vercel and/or create a new Apps Script deployment version as appropriate.

## Current workflow coverage

- Single operator: Narcotic Manager; Main Warehouse plus three pharmacies.
- Separate generic-drug and commercial-product records, manually entered unique codes.
- Batch and expiry tracking; receiving at Main Warehouse.
- One commercial product and one batch per distribution voucher.
- Controlled-drug prescription register and quantity matching.
- Immediate stock transfer on voucher save.
- Voucher cancellation reverses stock and removes the voucher from active registers while recording the cancellation reason separately.
- Stock adjustment with actual full packs plus remaining units, preview and confirmation.
- Compact stock movement log: Movement, Quantity, Document No.
- Near-expiry warning window configurable from the app's Settings page.

## Test before production

Use dummy records first. Verify generic and product creation, receipt, controlled and non-controlled distribution, voucher printing, cancellation, and stock adjustment. Google Sheets/Apps Script is not a transactional database; keep a protected backup and restrict app access before entering real records.
