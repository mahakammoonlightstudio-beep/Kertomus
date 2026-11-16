# Kertomus Linux release key

Kertomus signs its Linux release artifacts with a dedicated GPG key. The public
key is [`kertomus-release.asc`](kertomus-release.asc).

| | |
| --- | --- |
| Identity | `Kertomus Releases <mr.fauzan121314@gmail.com>` |
| Fingerprint | `A840 1FF4 C843 1BF2 081B  0DE2 77C5 8650 CE5E F7A7` |
| Algorithm | RSA 4096, sign + certify |
| Created | 2026-11-16 |
| Expires | 2028-11-15 |

The private key is stored only in the repository’s GitHub Actions secrets:

- `LINUX_GPG_PRIVATE_KEY` — the armored private key
- `LINUX_GPG_PASSPHRASE` — its passphrase

It is not committed, not shipped in the app, and not available to the renderer.
If the secrets are absent, the Linux job still builds and publishes unsigned
artifacts; signing is deliberately opt-in.

## Verify a release

```bash
gpg --import kertomus-release.asc
gpg --fingerprint "Kertomus Releases"

gpg --verify SHA256SUMS-linux-x64.asc
sha256sum --check SHA256SUMS-linux-x64
```

Each `Kertomus-<version>-linux-<arch>.AppImage` and `.tar.gz` also has a detached
`.asc` signature:

```bash
gpg --verify Kertomus-1.3.1-linux-x64.AppImage.asc \
  Kertomus-1.3.1-linux-x64.AppImage
```

A valid signature means the file was signed by this key. It does not replace
reading the release notes or checking the SHA-256 manifest.

## Rotation

1. Generate the replacement key in an offline environment.
2. Sign a transition statement with both the old and new keys.
3. Add the new public key here and update the fingerprint in the README.
4. Replace both Actions secrets in the same release window.
5. Keep the old public key available for verifying older releases.
