## Set Up
* Instalar nvm
  * curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
  * export NVM_DIR="$HOME/.nvm"
  * [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
* Instalar node
  * nvm install 8.0.0
* Instalar electron
  * npm install electron --save-dev --save-exact
* Instalar dependencias
  * npm install

## Uso
* npm start

## Build
* npm install electron-packager -g
* Windows: electron-packager . aproximador --platform=win32
* Linux: electron-packager . aproximador --platform=linux