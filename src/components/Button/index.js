const Button = props =>{
    return (
        <button onClick={props.onClick} type={`${props.type === 'submit' ? 'submit' : 'button'}`} disabled={props.disabled}>{props.text}</button>
    )
}

export default Button