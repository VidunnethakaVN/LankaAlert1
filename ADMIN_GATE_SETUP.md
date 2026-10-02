# Hidden Admin Entry

The citizen app does not show an Admin button in the navigation.

Admins can open the admin page by typing the configured secret phrase into the Command Center search field.

Current secret phrase:
`LA-Admin!7Qx#2026-Access`

The phrase is checked client-side only to provide a discreet navigation shortcut. It is **not** an authentication mechanism. The real security boundary remains the Firebase Auth + `admins/{uid}` authorization check in `admin.html` / `js/admin.js`.

If this project is deployed publicly, do not treat the secret phrase as a password. Anyone who obtains the client source can potentially discover or bypass a client-side gate. To make the phrase itself a real security credential, validate it on a trusted server/Cloud Function and issue an authenticated session/token.
