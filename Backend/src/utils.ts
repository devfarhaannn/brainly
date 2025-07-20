

export function random(len:number){
    let options = "ndcdbnuvjdncsinlnvlnck124244342"
    let lenght = options.length
    let ans = ""

    for(let i=0;i<len;i++){
        ans += options[Math.floor((Math.random() * lenght))]/// 0=>20
    }
    return ans;
}