import {types, consts} from "@sealsc/web-extension-protocol";

async function transfer(to, amount) {
  let result = await tronWeb.trx.sendTransaction(to, tronWeb.toSun(amount))
    .catch(reason => {
      return consts.predefinedStatus.UNKNOWN(reason)
    })

  if(result instanceof types.Status) {
    return new types.Result(null, result)
  } else {
    if(result.result) {
      return new types.Result(result.transaction.txID, consts.predefinedStatus.SUCCESS(result))
    } else {
      return new types.Result(result, consts.predefinedStatus.UNKNOWN())
    }
  }

}

export {
  transfer
}