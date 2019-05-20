import {TronwebChecker} from "./checker";
import {TronwebActions} from "./actions/actions";
import {TronwebContractCaller} from "./contractCaller";
import {types, consts} from "@sealsc/web-extension-protocol";

class TronwebExtension extends types.ExtensionWrapper {
  constructor() {
    super()
    this.checker = new TronwebChecker(this)
    this.actions = new TronwebActions(this)
    this.contractCaller = new TronwebContractCaller(this)
  }

  load() {
    this.webjsInstance = tronWeb
    return new types.Result(this.webjsInstance, consts.predefinedStatus.SUCCESS())
  }
}

let tronweb = new TronwebExtension()

export {
  tronweb
}