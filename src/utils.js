export function renderCustomTags(text){

    let res = text.replace(/\/tt/gims, '<div class="block-text">')
    res = res.replace(/tt\//gims, '</div>')

    // image multi
    res = res.replace(/img\([^)]*\)/gims, (match, offset, input) => {

        let innerStr = match.slice(4, match.length-1);
        let innerArr = innerStr.split(',');
        let subClass = 1;
        if(innerArr.length > 1){ // maybe has option

            let option = innerArr[0];
            if(option.length < 6){ // has option
                if(option.trim() == 'c'){
                    return `<div class="block-img xc" style="background-image: url(&quot;${innerArr[1] || ''}&quot;);"></div>`;
                } else {
                    subClass = option
                    innerArr.shift();
                }
            } else {               // no option
                subClass = innerArr.length
            }

        } else if(innerArr.length == 1){ // single img
            
        }

    

        let listImg = innerArr.map((img)=>{
            return `<img class="one-img" src="${img.trim()}">`
        })
        let res = `<div class="block-img x${subClass}"> 
                      ${listImg || ''}  
                   </div>`
        return res.replace(/,/gims,'') 
    });

    return res
}