# GCS Filepath Validator

Validates "bucket/object" or {bucket, object} as per [naming guidelines](https://cloud.google.com/storage/docs/naming#requirements).

### Usage

``` bash
npm install gcs-filepath-validator
```

``` js
validator.validateFilepath("my-bucket/my-object");
validator.validateFilepath({bucket: "my-bucket", object: "my-object"});
validator.validateBucket("my-bucket");
validator.validateObject("my-object");
```
