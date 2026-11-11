const getmethod = async(url)=>{
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Hiba tortent")
        }
        return response.json()
    }
    catch(error){
        throw new Error("Hiba tortent")
    }

}

document.addEventListener("DOMContentLoaded", async()=>{

    let h1 = document.getElementsByTagName("h1")[0]
    let url = "http://127.0.0.1:3000/api/readfile"
    const response = await getmethod(url)
    h1.innerHTML = response.text

})