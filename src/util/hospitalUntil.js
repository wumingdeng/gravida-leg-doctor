import Hospital_data from '/Users/Fizzo/Documents/workspace-js/gravida_server/hospital.json'
import g from "../globals/global.js";
export function checkHospital(tarName){
    for(var h_id in Hospital_data){
        var hospital = Hospital_data[h_id]
        console.log(tarName)
        console.log(hospital.host)
        if(hospital.host == tarName){
            g.gsStr = hospital.name
            g.h_no = h_id
            console.log("jiang jiang")
            return true
        }
    }
    return false
}