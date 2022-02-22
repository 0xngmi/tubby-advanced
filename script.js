async function getInstructions() {
    try {
        const proofs = await fetch("./proofs.json").then(r => r.json())
        const address = document.getElementById("address").value.toLowerCase()
        console.log(address)
        if (address.length !== 42) {
            alert("address is incorrect")
            return
        }
        const rugged = await fetch("./rugged.json").then(r => r.json())
        if (rugged.find(add => add.toLowerCase() === address) !== undefined) {
            alert("your address had an extra space at the end when submitted and cannot mint, we are working on a resolution")
            return
        }
        const proof = proofs[address]
        if (proof === undefined) {
            alert("your address is not in the whitelist")
            return
        }
        document.getElementById("proof").innerText = "[" + proof.join(',') + "]"
    } catch (e) {
        alert(e)
    }
}