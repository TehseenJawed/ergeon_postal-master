import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { POSTALFIELD, POSTAL } from '../../../redux/reducer/PostalStore'
import { UpdatePostal } from '../../../redux/action/PostalAction'
import { Postal } from '../../../typeCasting/expectedModels/model'
interface FilterData {

}
const PostalField = (props: any) => {
    const dispatch = useDispatch()
    const [filterData, setFilterData] = useState<FilterData[]>([])
    let postalField: Postal = useSelector(POSTALFIELD)
    const postalData: Postal[] = useSelector(POSTAL)
    const strData = String(postalField).toLowerCase()
    const reg = new RegExp('^[0-9]+$');
    
    const checkForFilter = () => {
        const filterSuggestions = postalData.filter(
            (suggestion:any) =>
                suggestion.toLowerCase().indexOf(strData) > -1
            );
        setFilterData(filterSuggestions.splice(0,5))
    }

    const updateField = (value: string) => {
        dispatch(UpdatePostal(value))
    }

    const haveData = () => {
        const haveData = filterData.indexOf(String(postalField))
        if (haveData && String(postalField) !== ""){
            return true
        } 
        return false
    }
    
    
    useEffect(() => checkForFilter(),[postalField])
    return (
        <div className='postal-code'>
            <input className={!reg.test(String(postalField)) ? 'input-error': ''} type="text" placeholder='Postal Code' value={String(postalField)} onChange={e => dispatch(UpdatePostal(e.target.value))} required/>
            <span>Suggestion: </span>
            {
                haveData()  && (
                    filterData?.map((v:any,i) => (
                        <div onClick={() => updateField(v)} className='postal-option' key={i}>{v}</div>
                    ))
                )
            }
        </div>
    )
}

export default PostalField;