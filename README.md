### DL Utility

Requires node-gyp and gulp-cli


Download to the root as example.flv
```
gulp url --url http://example.site --filename example
```

Download based on a YAML file
```yaml
prefix: "foobar-s01e"
urls:
  "episode_1": "http://example.site"
  "episode_2": "http://example.site" 
```
```shell
# use download.yml, create a directory "download"
gulp yaml
# use example.yml, create a directory "example"
gulp yaml --yaml some_yaml.yml
```
