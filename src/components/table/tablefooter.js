import Pagination from "react-bootstrap/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage,getCount } from "../../services/table";
//import { getCompanies,toggleStatus, updateCompany } from "../../services/company";
function TableFooter({ count,updateData }) {
  const dispatch = useDispatch();
  const [tableRange, setTableRange] = useState([]);
  let { pagelimit } = useSelector((store) => store.pagereducer);

  useEffect(() => {
     let limit = parseInt(pagelimit);
    const range = [];
    const num = Math.ceil(count / limit);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }

    setTableRange([...range]);
  }, [count, pagelimit]);


    const updatePageData=(offset)=>{
      offset=(offset)*(parseInt(pagelimit));
      let filter=`{"offset":${offset},"limit":${pagelimit}}`;
      dispatch(updateData(filter));
    }
 
    return (
        <div>
            <Pagination >
          {tableRange.length > 0 && count !== 0 && tableRange.map((el, index) => (
            
              <Pagination.Item key={index} onClick={()=>updatePageData(el-1)}>
                {el}
              </Pagination.Item>
           
          ))}
           </Pagination>
        </div>
      );
      
  
}

export default TableFooter;
