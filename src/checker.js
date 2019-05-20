import Is from "is_js";
import {types, consts} from "@sealsc/web-extension-protocol";

class TronwebChecker extends types.ExtensionChecker {
  async installed() {
    if (Is.undefined(window.tronWeb)) {
      return new types.Result(false, consts.predefinedStatus.NO_EXTENSION())
    }

    return new types.Result(true, consts.predefinedStatus.SUCCESS())
  }

  async isMainnet() {
    let checkInstall = await this.installed()
    if(!checkInstall.data) {
      return checkInstall
    }
    return  new types.Result("https://api.trongrid.io" === tronWeb.fullNode.host, consts.predefinedStatus.SUCCESS(tronWeb.fullNode.host))
  }

  async isLogin() {
    let checkInstall = await this.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    return !!tronWeb.ready ?
      new types.Result(true, consts.predefinedStatus.SUCCESS()) :
      new types.Result(false, consts.predefinedStatus.NOT_LOGIN())
  }
}

export {
  TronwebChecker
}