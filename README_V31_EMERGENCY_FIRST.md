# LankaAlert V31 — Emergency First

මෙම build එක emergency-first flow එකකට හරවලා තියෙන version එකක්.

## වෙනස් කළ දේ

- `index.html` දැන් login landing page එකක් නොවෙයි; `app.html` වෙත direct කරනවා.
- පළමු visit එකේ Language → Area → Location/Notifications permissions setup එක පෙන්වනවා.
- Firebase Auth persistence configuration එක local browser persistence සමඟම පවතින නිසා sign-in කළ account එක browser එකේ නැවත open කළාම restore වෙන්න හැකි ලෙස තබා ඇත.
- Guest dashboard එක public information පමණක් පෙන්වනවා; profile navigation ඉවත් කරලා top-right account control එකක් දමා ඇත.
- Dashboard එකේ secondary/live tools `More safety tools` යටතට move කරලා තියෙනවා. Safety checklist navigation/view එක UI එකෙන් ඉවත් කර ඇත.
- Profile picture Firestore profile document එකේ `photoDataUrl` ලෙස save කර නැවත load කරයි.
- Official/DMC alerts වල LankaAlert display expiry එක පැය 24ක් ලෙස filter කරයි; original notice link එක තවම තිබේ.
- Reports සඳහා `12h`, `1 day`, `2 days`, `3 days` retention choices ඇත. `forever` option එකක් නැත.
- Report එකේ phone verified account එකක් භාවිතා කළොත් `Verified` status එක save කරයි.
- Firebase phone verification UI එක account එකට phone link කරලා `phoneVerified`/`phoneNumber` profile fields save කරයි.
- Phone verification සඳහා Firebase Authentication Phone provider එක enabled තිබිය යුතු අතර browser reCAPTCHA flow එක අවශ්‍යයි.

## Firebase phone verification flow

User profile menu → `Verify phone number` → `+94XXXXXXXXX` → SMS code → verify.

Verification complete වුණාම එකම Firebase account එකේ phone credential link වෙන නිසා account/profile/report history එක වෙනම account එකකට මාරු නොවේ.

## වැදගත්

Report/alert expiry එක feed එකෙන් hide/remove කිරීමක් ලෙස implement කර ඇත. Firestore එකෙන් පැරණි documents auto-delete කිරීමක් මේ build එකෙන් කරන්නේ නැහැ.
