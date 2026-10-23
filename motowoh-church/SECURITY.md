# Website security

This is a static website with no accounts, payment processing, or server-side form submission.

Vercel applies the response headers in `vercel.json` to every route. The Content Security Policy permits local scripts, Google Fonts, the local media feed, TikTok players, and Google Maps. Inline JavaScript, plugins, form submissions, and embedding by other origins are blocked. Inline CSS remains allowed because page templates and animation delays use style attributes.

Additional headers enable MIME sniffing protection, same-origin framing, strict origin referrers, HTTPS enforcement, and restrictions on camera, microphone, location, payment, and USB access. HTTPS enforcement applies to the deployed host. The local preview must serve these headers to test their behavior; a basic static server does not apply `vercel.json`.

URL fragments select only explicitly owned page keys and never become executable HTML. External services control their own embedded content. These measures reduce browser-side risks; they do not constitute a security audit or provide backend authorization.

Keep the local browser profile, provider credentials, `.vercel`, and `.git` outside published assets. Recheck the CSP and Permissions Policy before adding providers, forms, analytics, or new browser capabilities.
