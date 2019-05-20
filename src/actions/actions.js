import {types} from "@sealsc/web-extension-protocol";
import {transfer} from "./transfer";
import {loadContract} from "./loadContract";
import {transferToken} from "./transferToken";
import {getAccount} from "./getAccount";

class TronwebActions extends types.ExtensionActions {
  async transfer(to, amount, memo, extra) {
    return await transfer.call(this, to, amount, memo, extra)
  }

  async loadContract(abi, address) {
    return await loadContract.call(this, address)
  }

  async transferToken(wrapper, to, amount) {
    return await transferToken.call(this, wrapper, to, amount)
  }

  async getAccount() {
    return await getAccount.call(this)
  }
}

export {
  TronwebActions
}