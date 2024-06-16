export const getValueWithApiKey=(item,columnName)=>{
    const value=item[columnName["value"]];
    if(columnName['value'].includes("_")){
        const [first,second]=columnName["value"].split("_");
        return `${item[first]??""}${item[second]??""}`;
    }
    else
    {
        return value ?? "-";
    }
}