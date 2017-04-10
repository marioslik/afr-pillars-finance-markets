slik ultimate banner template
=============

The purpose of this is to be used as a starter template for all banner builds.

SASS, ES6 JS, Auto Image compression & zip utilities.

Installation
-----------

```
sudo npm install
```

Usage
-----

For development run...

```
gulp dev --size <YOUR SIZE>
i.e gulp dev --size 300x250
```

To bundle individual sizes for deployment...

```
gulp build --size <YOUR SIZE>
i.e gulp build --size 300x250
```

To bundle all files for deployment...

```
gulp build --size 300x250 && gulp build --size 300x600 && gulp build --size 160x600 && gulp build --size 728x90 && gulp build --size 970x250
```
