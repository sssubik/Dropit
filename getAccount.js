const CryptoCat = require("./deploymentDataContract.js");

Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/993f219d63d045028f89cc8c786dd0a1"));





//#########################################################
//############ Crypto Cat 1 ###############################
//#########################################################
getOwnerAddressesCC1 =  async () =>{
    var CC1Addresses = []

    //Contract Init
    const cryptoCat = await new web3.eth.Contract(CryptoCat.CRYPTOCATABI1, CryptoCat.CRYPTOCATADDRESS1)
    startBlockCC1 = 0

    //Assign Events
    const allAssignEvents = await cryptoCat.getPastEvents("Assign", {
        fromBlock: startBlockCC1,
        toBlock: 'latest'
    })

    //Assign Events
    const allTransferEvents = await cryptoCat.getPastEvents("Transfer", {
        fromBlock: startBlockCC1,
        toBlock: 'latest'
    })
    //console out Assign Event
    console.log("CryptoCatContract1TokenOwnersAssignEvents = [");
    await printAddressesFromAssignEvents(allAssignEvents, CC1Addresses)    
    // console out transfer events
    console.log("CryptoCatContract1TokenOwnersTransferEvents = [");
    await printAddressesFromTransferEvents(allTransferEvents, CC1Addresses) 
    console.log("CryptoCatContract1UniqueTokenOwners = [")
    uniqueAddresses = getAndPrintUniqueAddresses(CC1Addresses)
    return uniqueAddresses
}


//#########################################################
//############ Crypto Cat 2 ###############################
//#########################################################
getOwnerAddressesCC2 =  async () =>{
    var CC2Addresses = []
    
    //contract init
    const cryptoCat = await new web3.eth.Contract(CryptoCat.CRYPTOCATABI2, CryptoCat.CRYPTOCATADDRESS2)
    
    //assign Events
    startBlockCC2 = 0
    const allAssignEvents = await cryptoCat.getPastEvents("Assign", {
        fromBlock: startBlockCC2,
        toBlock: 'latest'
    })

    //transferEvents
    const allTransferEvents = await cryptoCat.getPastEvents("Transfer", {
        fromBlock: startBlockCC2,
        toBlock: 'latest'
    })

    //Console out assign events
    console.log("CryptoCatContract2TokenOwnersAssignEvents = [");
    await printAddressesFromAssignEvents(allAssignEvents, CC2Addresses)  


    // console out transfer events
    console.log("CryptoCatContract2TokenOwnersTransferEvents = [");
    await printAddressesFromTransferEvents(allTransferEvents, CC2Addresses) 

    // consoel out unique addresses
    console.log("CryptoCatContract2UniqueTokenOwners = [")
    uniqueAddresses = getAndPrintUniqueAddresses(CC2Addresses)
    return uniqueAddresses


}


//#########################################################
//############ Crypto Cat 3 ###############################
//#########################################################
getOwnerAddressesCC3 =  async () =>{
    var CC3Addresses = []

    //Contract Init
    const cryptoCat = await new web3.eth.Contract(CryptoCat.CRYPTOCATABI3, CryptoCat.CRYPTOCATADDRESS3)
    startBlockCC3 = 0

    const allAssignEvents = await cryptoCat.getPastEvents("Assign", {
        fromBlock: startBlockCC3,
        toBlock: 'latest'
    })

    const allTransferEvents = await cryptoCat.getPastEvents("Transfer", {
        fromBlock: startBlockCC3,
        toBlock: 'latest'
    })

    console.log("CryptoCatContract3TokenOwnersAssignEvents = [");
    await printAddressesFromAssignEvents(allAssignEvents, CC3Addresses)  

    console.log("CryptoCatContract3TokenOwnersTransferEvents = [");
    await printAddressesFromTransferEventsCC3(allTransferEvents, CC3Addresses) 

    // consoel out unique addresses
    console.log("CryptoCatContract3UniqueTokenOwners = [")
    uniqueAddresses = getAndPrintUniqueAddresses(CC3Addresses)


    return uniqueAddresses
}

//#########################################################
//############ Wrapped Crypto Cat ###############################
//#########################################################
getOwnerAddressWrapped =  async () =>{
    var WrappedCAddresses = []

    //Contract Init
    const cryptoCat = await new web3.eth.Contract(CryptoCat.CRYPTOCATWRAPPEDABI, CryptoCat.CRYPTOCATWRAPPEDADDRESS)
    startBlockCC3 = 0

   /*  const allAssignEvents = await cryptoCat.getPastEvents("Assign", {
        fromBlock: startBlockCC3,
        toBlock: 'latest'
    }) */

    const allTransferEvents = await cryptoCat.getPastEvents("Transfer", {
        fromBlock: startBlockCC3,
        toBlock: 'latest'
    })
/* 
    console.log("CryptoCatContract3TokenOwnersAssignEvents = [");
    await printAddressesFromAssignEvents(allAssignEvents, WrappedCAddresses)  
 */

    console.log("WrappedCryptoCatContractTokenOwnersTransferEvents = [");
    await printAddressesFromTransferEventsWrapped(allTransferEvents, WrappedCAddresses) 

    // consoel out unique addresses
    console.log("WrappedCryptoCatContract3UniqueTokenOwners = [")
    uniqueAddresses = getAndPrintUniqueAddresses(WrappedCAddresses)


    return uniqueAddresses
}




//#########################################################
//############ helper functions ###########################
//#########################################################

printAddressesFromAssignEvents = async (allAssignEvents, addresses) =>{ 
    for(var i = 0; i < allAssignEvents.length; i++){
        var catIndex = parseInt(await allAssignEvents[i].returnValues['catIndex'])
        catName = "Cat "+catIndex.toString()
        toAddress = allAssignEvents[i].returnValues['to']
        addresses.push(toAddress)
        console.log("["+ catIndex + ",\"" + catName + "\"" +","+ "\"" + toAddress + "\"],")
        
    }
    console.log("[\"Length"+"\","+allAssignEvents.length+"],")
    console.log("];")
}

printAddressesFromTransferEvents = async (allTransferEvents, addresses) => {
    for(var i = 0; i < allTransferEvents.length; i++){
        var catIndex = parseInt(await allTransferEvents[i].returnValues['catIndex'])
        catName = "Cat "+catIndex.toString()
        toAddress = allTransferEvents[i].returnValues['to']
        addresses.push(toAddress)
        console.log("["+ catIndex + ",\"" + catName + "\"" +","+ "\"" + toAddress + "\"],")         
    }
    console.log("[\"Length"+"\","+allTransferEvents.length+"],")
    console.log("];")   
}

printAddressesFromTransferEventsWrapped = async (allTransferEvents, addresses) => {
    for(var i = 0; i < allTransferEvents.length; i++){
        var catIndex = parseInt(await allTransferEvents[i].returnValues['tokenId'])
        catName = "Cat "+catIndex.toString()
        toAddress = allTransferEvents[i].returnValues['to']
        addresses.push(toAddress)
        console.log("["+ catIndex + ",\"" + catName + "\"" +","+ "\"" + toAddress + "\"],")         
    }
    console.log("[\"Length"+"\","+allTransferEvents.length+"],")
    console.log("];")   
}

printAddressesFromTransferEventsCC3 = async (allTransferEvents, addresses) => {
    for(var i = 0; i < allTransferEvents.length; i++){
        
        toAddress = allTransferEvents[i].returnValues['to']
        addresses.push(toAddress)
        console.log("[" + i + ",\"" + toAddress + "\"],")
        
    }
    console.log("[\"Length"+"\","+allTransferEvents.length+"],")
    console.log("];")

}

getAndPrintUniqueAddresses =  async (addresses) =>{
     //Get Unique Addresses
     const uniqueAddresses = [...new Set(addresses)]
     
     for(var i = 0; i < uniqueAddresses.length; i++){
         toAddress = uniqueAddresses[i]
         console.log("[" + i + ",\"" + toAddress + "\"],")
         
     }
     console.log("[\"Length"+"\","+uniqueAddresses.length+"],")
     console.log("];")

     return uniqueAddresses
}


//#########################################################
//############ call this!!!!!! ###############################
//#########################################################
main = async() =>{
   var allAddresses = []
    CC1Addresses = await getOwnerAddressesCC1()
    CC2Addresses = await getOwnerAddressesCC2() 
    CC3Addresses = await getOwnerAddressesCC3() 
    WrrapeedAddresses = await getOwnerAddressWrapped()
    allAddresses=allAddresses.concat(CC1Addresses,CC2Addresses,CC3Addresses,WrrapeedAddresses)
    

    console.log("AllUniqueAddressesfound = [");
    uniqueAddresses = await getAndPrintUniqueAddresses(allAddresses)

    await publishToExcel(uniqueAddresses)
     
    
    
}

publishToExcel = async (allAddresses) => {
    var fs = require('fs');
    var writeStream = fs.createWriteStream("CryptoCats.xls");
    var title = " Crypto Cats Unique Addresses " + "\n"
    writeStream.write(title)
    var header="Serial No"+"\t"+" to Address" + "\n";
    writeStream.write(header)
    for(var i = 0; i< allAddresses.length; i++){
        row = i.toString() + "\t" + allAddresses[i] + "\n";
        writeStream.write(row)
    }
    writeStream.close()


}
main()