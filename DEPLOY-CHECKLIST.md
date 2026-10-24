# CNIPMS Deployment Checklist (no Environment Variables / no Script Properties)

- [ ] Make GitHub repository PRIVATE.
- [ ] Paste Google Sheets ID into `CNIPMS_SPREADSHEET_ID` in `apps-script/Code.gs`.
- [ ] Run `initializeDatabase` and authorize Google Sheets access.
- [ ] Deploy Apps Script as Web App (Execute as Me; access Anyone) and copy `/exec` URL.
- [ ] Paste the `/exec` URL into `CNIPMS_GAS_URL` in `api/index.js`.
- [ ] Ensure the API token matches in `api/index.js` and `apps-script/Code.gs`.
- [ ] Upload the package contents to the GitHub repository root.
- [ ] Deploy/redeploy the GitHub-connected Vercel project.
- [ ] Enable Vercel Deployment Protection or equivalent access restriction before entering real data.
- [ ] Test with dummy data and verify stock movements.
