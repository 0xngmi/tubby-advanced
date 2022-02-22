const proofsPromise = fetch("./proofs.json").then(r => r.json())
const ruggedPromise = fetch("./rugged.json").then(r => r.json())

async function checkLists() {
    const proofs = await proofsPromise
    const address = document.getElementById("address").value.toLowerCase()
    console.log(address)
    if (address.length !== 42) {
        alert("address is incorrect")
        return null
    }
    const rugged = await ruggedPromise
    if (rugged.find(add => add.toLowerCase() === address) !== undefined) {
        alert("your address had an extra space at the end when submitted and cannot mint, we are working on a resolution")
        return null
    }
    const proof = proofs[address]
    if (proof === undefined) {
        alert("your address is not in the whitelist")
        return null
    }
    return proof
}

async function getInstructions() {
    try {
        const proof = await checkLists()
        if(proof === null){
            return
        }
        document.getElementById("proof").innerText = "[" + proof.join(',') + "]"
    } catch (e) {
        alert(e)
    }
}

async function checkWl() {
    try {
        const proof = await checkLists()
        if(proof !== null){
            alert("You are on the whitelist!")
        }
    } catch (e) {
        alert(e)
    }
}