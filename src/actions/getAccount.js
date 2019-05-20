import {types, consts} from "@sealsc/web-extension-protocol";

async function getAccount() {
  return !!tronWeb.ready ?
    new types.Result(tronWeb.defaultAddress.base58, consts.predefinedStatus.SUCCESS()) :
    new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
}

export {
  getAccount
}