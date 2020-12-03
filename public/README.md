# Public

Folder that will contain items that need nodeIntegration and the `__static` variable to remain usable in the production build.

## Default Settings

```txt
  .
  ├── icon.ico                     # Favicon base for yarn icon command generate in build mode
  ├── index.html                   # HTML base for build Virtual-DOM
```

## FR Settings

```txt
  .
  ├── data                         # Data manipulation for only offline specification
  |   └── config                   # General presettings
  |   └── constants                # Readonly data, based on RPG content specification
  |   └── register                 # User save data
  |   └── localisation             # Localisation static data
  ├── services                     # Utils with data implementation
  |   └── fs.js                    # Read/Write Json/TOML data
```
