import {types, consts} from "@sealsc/web-extension-protocol";

async function loadContract(address) {
  let contract = null
  let wrapper = null
  let err = consts.predefinedStatus.SUCCESS()
  try {
    contract = await this.extension.webjsInstance.contract().at(address)
      .catch(reason => {
        return consts.predefinedStatus.UNKNOWN(reason)
      })

    if(contract instanceof types.Status) {
      err = contract
    } else {
      wrapper = new types.ContractWrapper("", address, contract)
    }
  } catch(e) {
    err = consts.predefinedStatus.UNKNOWN(e)
  }
  return new types.Result(wrapper, err)
}

export {
  loadContract
}