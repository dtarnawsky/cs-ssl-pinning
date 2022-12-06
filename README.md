# SSL Pinning Sample

## Supplying certificates
Certificates need to be stored in the `www/certificates` folder. One way to ensure this is to create a `certificates` folder under `src` and then add this to the `assets` property of `angular.json`:
```json
              {
                "glob": "**/*.cer",
                "input": "src/certificates",
                "output": "certificates"
              },
```

- Certificate must have a `.cer` extension.
- Certificates must be in `DER` format.

## Extract certificates via Browser
To extract the DER for a certificate:
- Visit the url in a browser (Microsoft Edge)
- Click the lock symbol next to the url
- Click the "Connection is Secure" link
- Click the certificate symbol next to the close button
- Click the details tab
- Click one of the certificates in the hierarchy
- Click Export button
- Choose "DER-encoded binary, single certificate" as the format
- Save the file to your certificates folder with an extension of .cer
- Repeat these steps for each certificate in the chain

## Extracting Certs with Open SSL
This sample app connects to `https://mysafeinfo.com`. To extract the public certificates we can call:
`openssl s_client -connect mysafeinfo.com:443 -showcerts`

- From the output of the command, create a new file in `/certificates` (name it <anything>.pem)
- Paste into it all certificates shown in the output. 
- Certificates start with the line `-----BEGIN CERTIFICATE-----` and end with the line `-----END CERTIFICATE-----` (inclusive). 
- If multiple are shown, paste them in the order you see them in the output.
- Then convert to [DER format](https://knowledge.digicert.com/solution/SO26449.html)
- eg. `openssl x509 -outform der -in <anything>.pem -out <anything>.cer`

## Check your Certificate
To validate if your `.cer` file is in the right format (DER) you can run this command:
`openssl x509 -in <anything>.cer -inform der -text -noout`
If it throws an error `unable to load certificate` then you know your file is using an incorrect format

## Notes
- To support Capacitor this [PR](https://github.com/silkimen/cordova-plugin-advanced-http/pull/488) is needed.
- To help with debugging cert issues this [PR](https://github.com/silkimen/cordova-plugin-advanced-http/pull/489) is needed.
- A fork with these changes can be installed with `npm install cordova-plugin-advanced-http@https://github.com/dtarnawsky/cordova-plugin-advanced-http`

### Gotchas
- In iOS 13 additional requirements were added to TLS certificates. These can cause an SSL failure. Read about it [here](https://support.apple.com/en-us/HT210176)
- Using OpenSSL to extract all certificates in a chain can be a challenge and may not export every certificate. You may need to export from a browser
