import RNSecureStorage from "rn-secure-storage";

export const saveData = async (key,val) => {

    try {
        await RNSecureStorage.set(key, val,{})
        return true
    } catch (error) {
        console.log("Cannot save data",error);
        return false
    }
};
export const readData = async (key) => {
    console.log("read ",key)
    try {
        const value = await RNSecureStorage.get(key);
        console.log("value ",value)
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log("Here ")
        return null;
    }
};
export const deleteData = async (key) => {
    try {
        await RNSecureStorage.remove(key);

    } catch (error) {
        return null;
        // Error retrieving data
    }
};


export const item_exist=async (key)=>{

    return await RNSecureStorage.exists(key)
    // console.log(await allkeys())
    //return await MMKV.getAllKeys().map((x)=>{return x})[0].indexOf(key)>-1;
}


export const saveToken=async (val)=>{
    return await saveData("token",val)}
export const readToken=async ()=>{
    let t=await readData("token")
    console.log("========> t : ",t)
    return JSON.parse(t)
}
