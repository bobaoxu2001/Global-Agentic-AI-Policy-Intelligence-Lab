# Vercel Preview Deployment

The Golden 8 profile is a non-production interview research preview. Never deploy it with `vercel --prod`.

## Vercel CLI

1. Configure `BUILD_PROFILE=preview` for the Vercel **Preview** environment.
2. Confirm the repository uses `npm run build:vercel` (declared in `vercel.json`).
3. From the repository root, run `vercel deploy --target preview --build-env BUILD_PROFILE=preview`.
4. Open the returned Preview URL and confirm the persistent AI-assisted preview banner.

The build requires Vercel to provide `VERCEL_ENV=preview`; missing or mismatched environment values fail closed.
New Vercel projects may enable Deployment Protection by default. For a genuinely public interview URL, confirm Project Settings → Deployment Protection does not require Vercel Authentication for this project; otherwise the URL is a private Preview and must not be described as public.

## Git-connected project

1. Import the GitHub repository into Vercel.
2. In Project Settings → Environment Variables, set `BUILD_PROFILE=preview` for **Preview** only.
3. Keep Production configured with `BUILD_PROFILE=production`.
4. Use `npm run build:vercel` as the Build Command.
5. Create a branch or pull request. Vercel will create a Preview deployment with `VERCEL_ENV=preview`.

Production remains subject to the formal human publication workflow. AI-assisted preview approval is never treated as publication approval.
