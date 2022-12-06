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
In `src/android/com/silkimen/cordovahttp/CordovaServerTrust.java` it is reading from `www/certificates` and should also pull from `public/certificates` to work for Capacitor.
In `src/ios/SM_AFNetworking/SM_AFSecurityPolicy.m` it is similar

```objectivec
+ (NSSet *)certificatesInBundle:(NSBundle *)bundle {
    NSArray *paths = [bundle pathsForResourcesOfType:@"cer" inDirectory:@"www/certificates"];
    NSArray *capPaths = [bundle pathsForResourcesOfType:@"cer" inDirectory:@"public/certificates"];
    NSMutableSet *certificates = [NSMutableSet setWithCapacity:[paths count]];

    for (NSString *path in paths) {
        NSData *certificateData = [NSData dataWithContentsOfFile:path];
        [certificates addObject:certificateData];
    }

    for (NSString *path in capPaths) {
        NSData *certificateData = [NSData dataWithContentsOfFile:path];
        [certificates addObject:certificateData];
    }    

    return [NSSet setWithSet:certificates];
}
```
