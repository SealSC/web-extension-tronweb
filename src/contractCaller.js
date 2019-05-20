import Is from "is_js";
import {types, consts} from "@sealsc/web-extension-protocol";

function getContractMethod(contract, methodName) {
  let methodsList = contract.abi

  let payable = false
  let constant = false
  let methodFunc = null
  methodsList.forEach(m => {
    if(methodName === m.name && "Function" === m.type) {
      methodFunc = contract[methodName]
      payable = m.payable
      constant = m.constant
    }
  })

  if(!methodFunc) {
    return null
  }

  return {
    payable: payable,
    constant: constant,
    func: methodFunc
  }
}

class TronwebContractCaller extends types.ExtensionContractCaller {
  async onChainCall(wrapper, methodName, param, amount) {
    if(!Is.array(param)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(param))
    } else if(0 === param.length) {
      param = []
    }

    let method = getContractMethod(wrapper.contract, methodName)
    if(!method) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(methodName))
    }

    let sendParam = {
      shouldPollResponse: false
    }

    if(method.payable) {
      sendParam.callValue = tronWeb.toSun(amount)
    }

    let result = await method.func(...param).send(sendParam)
      .catch(reason => {
        return consts.predefinedStatus.UNKNOWN(reason)
      })

    if(result instanceof types.Status) {
      return new types.Result(null, result)
    } else {
      return new types.Result(result, consts.predefinedStatus.SUCCESS())
    }
  }

  async offChainCall(wrapper, methodName, param = []) {
    if(!Is.array(param)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(param))
    } else if(0 === param.length) {
      param = []
    }

    let method = getContractMethod(wrapper.contract, methodName)
    if(!method) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(methodName))
    }

    if(!method.constant) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(methodName))
    }

    let result = await method.func(...param).call()
      .catch(reason => {
        return consts.predefinedStatus.UNKNOWN(reason)
      })

    if(result instanceof types.Status) {
      return new types.Result(null, result)
    } else {
      return new types.Result(result, consts.predefinedStatus.SUCCESS())
    }
  }
}

export {
  TronwebContractCaller
}