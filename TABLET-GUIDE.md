# CNIPMS Tablet Edition

This package adds a touch-first responsive tablet layout to the existing CNIPMS application.

## Included tablet behavior
- Landscape and portrait responsive layouts.
- Tap-to-open navigation drawer with backdrop.
- No hover dependency for tablet navigation.
- Touch-friendly navigation, buttons, form controls and table scrolling.
- Desktop layout and existing Google Sheets / Apps Script integration retained.

## Deploy
1. Replace the files in your existing GitHub repository with the contents of `CNIPMS-Deploy`.
2. Keep the existing Apps Script deployment and spreadsheet. No database reset is required.
3. Commit the changes and allow Vercel to deploy automatically, or trigger a Redeploy.
4. Open the Vercel URL on the tablet in Safari or Chrome.

## Important
This is a responsive web application, not a separate database or native iOS/Android app. The same records are shared with desktop because all devices use the same Google Sheets backend.

Before entering real patient or controlled-drug records, restrict site access appropriately and test the complete workflow with non-production data.
