import {forwardRef, memo as Memo} from 'react'

const Input = forwardRef((props,ref) =>{
    return (
        <input onChange={props.onChange} ref={ref} type={props.type} value={props.value}/>
    )
},[])

export default Input